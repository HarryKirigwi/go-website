package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/HarryKirigwi/go-website/blob/main/backend/config"
	"github.com/HarryKirigwi/go-website/blob/main/backend/routes"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Connect to the database
	collection := config.ConnectDatabase()

	// Initialize Fiber app
	app := fiber.New()

	// Enable CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("ALLOWED_ORIGIN"),
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	// Register routes
	routes.RegisterRoutes(app, collection)

	// Start the app
	log.Fatal(app.Listen(":3000"))
}
