package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/HarryKirigwi/go-website/backend/auth"
	"github.com/HarryKirigwi/go-website/backend/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found. Ensure environment variables are set.")
	}

	// Initialize configuration (database and JWT secret)
	cfg, err := config.InitConfig()
	if err != nil {
		log.Fatalf("Failed to initialize configuration: %v", err)
	}
	defer func() {
		if err := cfg.Client.Disconnect(config.DefaultContext()); err != nil {
			log.Printf("Error disconnecting from MongoDB: %v", err)
		} else {
			log.Println("Successfully disconnected from MongoDB.")
		}
	}()

	// Validate ALLOWED_ORIGIN
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		log.Fatal("ALLOWED_ORIGIN is not set in the environment variables")
	}

	// Initialize Fiber app
	app := fiber.New()

	// Add middleware
	app.Use(logger.New()) // Logs every request
	app.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigin,
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	// Serve static files
	app.Static("/", "./public")

	// Register routes
	registerRoutes(app)

	// Graceful shutdown
	go func() {
		port := os.Getenv("PORT")
		if port == "" {
			port = "3000" // Default port
		}
		log.Printf("Server is running on port %s...", port)
		if err := app.Listen(":" + port); err != nil {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for termination signals
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	if err := app.Shutdown(); err != nil {
		log.Printf("Error during server shutdown: %v", err)
	}
}

// registerRoutes registers all application routes
func registerRoutes(app *fiber.App) {
	// Public routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Welcome to the User Registration API!")
	})

	// Auth routes
	app.Post("/api/login", auth.Login)
	app.Post("/api/register", auth.Register)

	// Protected routes
	app.Get("/api/user/dashboard", auth.AuthMiddleware("user"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the User Dashboard"})
	})

	app.Get("/api/admin/dashboard", auth.AuthMiddleware("admin"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the Admin Dashboard"})
	})
}
