package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Global variables for the database and JWT secret
var (
	DB        *mongo.Database
	JWTSecret string
)

// InitConfig initializes the application's configuration
func InitConfig() {
	// Load the JWT secret from environment variables
	JWTSecret = os.Getenv("JWT_SECRET")
	if JWTSecret == "" {
		log.Fatal("JWT_SECRET is not set in the environment variables")
	}

	// Connect to MongoDB and set the global `DB` variable
	DB = connectDatabase()
}

// connectDatabase establishes and verifies a connection to MongoDB
func connectDatabase() *mongo.Database {
	// Get the MongoDB URI from environment variables
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI is not set in the environment variables")
	}

	// Define MongoDB client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Create a context with a timeout to prevent hanging connections
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Initialize a MongoDB client
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	// Test the connection by pinging the database
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	log.Println("Successfully connected to MongoDB!")

	// Return the specified database (e.g., "users")
	return client.Database("users")
}
