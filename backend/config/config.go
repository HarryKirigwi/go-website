package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Global variables for database and JWT secret
var (
	DB        *mongo.Database
	JWTSecret string
)

// Initialize configuration
func InitConfig() {
	// Load the JWT secret from environment variables
	JWTSecret = os.Getenv("JWT_SECRET")
	if JWTSecret == "" {
		log.Fatal("JWT_SECRET is not set in the .env file")
	}

	// Connect to MongoDB
	DB = connectDatabase()
}

// ConnectDatabase establishes a connection to the MongoDB database
func connectDatabase() *mongo.Database {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI is not set in the .env file")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)

	// Set up a context with a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create a new client and connect to the server
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Error connecting to MongoDB:", err)
	}

	// Ping the database to ensure the connection is established
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	log.Println("Connected to MongoDB!")

	// Specify the database to use
	return client.Database("users")
}
