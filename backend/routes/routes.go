// routes.go
package routes

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/HarryKirigwi/go-website/backend/models"
	"github.com/HarryKirigwi/go-website/backend/auth"
)

// RegisterRoutes registers all the routes for the application
func RegisterRoutes(app *fiber.App, collection *mongo.Collection) {
	// Public routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Welcome to the User Registration API!")
	})

	// Auth routes
	app.Post("/api/login", auth.Login)  // Add this line to register the login route
	app.Post("/api/register", handleRegistration(collection))

	// Protected routes
	app.Get("/api/user/dashboard", auth.AuthMiddleware("user"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the User Dashboard"})
	})
	
	app.Get("/api/admin/dashboard", auth.AuthMiddleware("admin"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the Admin Dashboard"})
	})
}

// handleRegistration is a helper function to handle user registration
func handleRegistration(collection *mongo.Collection) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var newUser struct {
			FirstName       string `json:"firstName"`
			LastName        string `json:"lastName"`
			Email           string `json:"email"`
			Password        string `json:"password"`
			ConfirmPassword string `json:"confirmPassword"`
		}

		if err := c.BodyParser(&newUser); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "Failed to parse request body",
			})
		}

		// Validate passwords match
		if newUser.Password != newUser.ConfirmPassword {
			return c.Status(400).JSON(fiber.Map{
				"error": "Passwords do not match",
			})
		}

		hashedPassword, err := models.HashPassword(newUser.Password)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to hash password",
			})
		}

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// Check for existing user
		var existingUser struct{}
		err = collection.FindOne(ctx, bson.D{{Key: "email", Value: newUser.Email}}).Decode(&existingUser)
		if err == nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "User with this email already exists",
			})
		}

		// Insert new user with a role
		_, err = collection.InsertOne(ctx, bson.D{
			{Key: "firstName", Value: newUser.FirstName},
			{Key: "lastName", Value: newUser.LastName},
			{Key: "email", Value: newUser.Email},
			{Key: "password", Value: hashedPassword},
			{Key: "role", Value: "user"}, // Default role for new users
		})
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to insert user into database",
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"message": "User registered successfully",
		})
	}
}
