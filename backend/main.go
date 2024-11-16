package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	FirstName       string `json:"firstName"`
	LastName        string `json:"lastName"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Get the MongoDB URI from the environment variable
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI is not set in the .env file")
	}

	// Get the allowed origin from the environment variable (can be set to '*' in dev but restricted in prod)
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")

	// Create a MongoDB client
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Error creating MongoDB client:", err)
	}

	// Define a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("Error connecting to MongoDB:", err)
	}
	defer client.Disconnect(ctx)

	fmt.Println("Connected to MongoDB!")

	// Access a database and collection
	database := client.Database("users")
	collection := database.Collection("userscollection")

	// Initialize Fiber app
	app := fiber.New()

	// Enable CORS middleware for the app with dynamic allowed origins
	app.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigin,
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Welcome to the User Registration API!")
	})
	// Define the POST endpoint for registration

	app.Post("/api/register", func(c *fiber.Ctx) error {
		var newUser User

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

		hashedPasswordString := string(hashedPassword)

		// Context with timeout for MongoDB operations
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// Check for existing user
		var existingUser User
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
			{Key: "password", Value: hashedPasswordString},
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

	// Start the app
	log.Fatal(app.Listen(":3000"))
}
