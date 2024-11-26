package main

import (
	"log"
	"os"

	// "github.com/HarryKirigwi/go-website/backend/config"
	"github.com/HarryKirigwi/go-website/backend/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Validate JWT_SECRET and ALLOWED_ORIGIN
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET is not set in the environment variables")
	}
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

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Default port
	}
	log.Printf("Server is running on port %s...", port)
	log.Fatal(app.Listen(":" + port))
}
