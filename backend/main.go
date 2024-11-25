// package main

// import (
// 	"log"
// 	"os"

// 	"github.com/HarryKirigwi/go-website/backend/config"
//     "github.com/HarryKirigwi/go-website/backend/routes"
// 	"github.com/gofiber/fiber/v2"
// 	"github.com/gofiber/fiber/v2/middleware/cors"
// 	"github.com/joho/godotenv"
// )

// func main() {
// 	// Load environment variables
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal("Error loading .env file:", err)
// 	}

// 	// Connect to the database
// 	collection := config.ConnectDatabase()

// 	// Initialize Fiber app
// 	app := fiber.New()

// 	// Enable CORS middleware
// 	app.Use(cors.New(cors.Config{
// 		AllowOrigins:     os.Getenv("ALLOWED_ORIGIN"),
// 		AllowMethods:     "GET,POST,PUT,DELETE",
// 		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
// 		AllowCredentials: true,
// 	}))

// 	// Register routes
// 	routes.RegisterRoutes(app, collection)

// 	// Start the app
// 	log.Fatal(app.Listen(":3000"))
// }

package main

import (
	"log"
	"os"

	"github.com/HarryKirigwi/go-website/backend/config"
	"github.com/HarryKirigwi/go-website/backend/routes"
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

	// Connect to the database
	collection := config.ConnectDatabase()

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
	app.Use(fiber.Compress()) // Enable gzip compression

	// Serve static files (if applicable)
	app.Static("/", "./public")

	// Register routes
	routes.RegisterRoutes(app, collection)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Default port
	}
	log.Printf("Server is running on port %s...", port)
	log.Fatal(app.Listen(":" + port))
}
