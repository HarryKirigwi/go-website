package routes

import (
	"context"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"github.com/HarryKirigwi/go-website/backend/auth"
)

// RegisterRoutes registers all the routes for the application
func RegisterRoutes(app *fiber.App, collection *mongo.Collection) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Welcome to the User Registration API!")
	})

	app.Post("/api/register", func(c *fiber.Ctx) error {
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

		// Hash the password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to hash password",
			})
		}

		//hashedStringPassword
		hashedPasswordString := string(hashedPassword)

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// Check for existing user
		var existingUser struct{}
		err = collection.FindOne(ctx, bson.D{{Key: "email", Value: newUser.Email}}).Decode(&existingUser)
		if err == nil {
			return c.Status(400).JSON(fiber.Map{
				"error": "User with this email already exists",
			})
		} else if err != mongo.ErrNoDocuments {
			fmt.Printf("Error finding user: %v\n", err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to check for existing user",
			})
		}

		// Insert new user
		_, err = collection.InsertOne(ctx, bson.D{
			{Key: "firstName", Value: newUser.FirstName},
			{Key: "lastName", Value: newUser.LastName},
			{Key: "email", Value: newUser.Email},
			{Key: "password", Value: string(hashedPasswordString)},
		})
		if err != nil {
			fmt.Printf("MongoDB insert error: %v\n", err)
			return c.Status(500).JSON(fiber.Map{
				"error": "Failed to insert user into database",
			})
		}

		return c.Status(201).JSON(fiber.Map{
			"message": "User registered successfully",
		})
	})
}

func SetupRoutes(app *fiber.App) {
    api := app.Group("/api")

    // Authentication routes
    api.Post("/login", auth.Login)


    // Protected routes
    api.Get("/user/dashboard", auth.AuthMiddleware("user"), func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"message": "Welcome to the User Dashboard"})
    })
    api.Get("/admin/dashboard", auth.AuthMiddleware("admin"), func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"message": "Welcome to the Admin Dashboard"})
    })
}
