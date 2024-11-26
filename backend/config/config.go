package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config struct to encapsulate application configuration
type Config struct {
	DB        *mongo.Database
	Client    *mongo.Client
	JWTSecret string
}

// InitConfig initializes the application's configuration and returns a Config struct
func InitConfig() (*Config, error) {
	// Load the JWT secret
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is not set in the environment variables")
	}

	// Connect to MongoDB
	client, db, err := connectDatabase()
	if err != nil {
		return nil, err
	}

	// Ensure required collections and indexes
	if err := initializeCollections(db); err != nil {
		return nil, err
	}

	// Return a populated Config struct
	return &Config{
		DB:        db,
		Client:    client,
		JWTSecret: jwtSecret,
	}, nil
}

// connectDatabase establishes and verifies a connection to MongoDB
func connectDatabase() (*mongo.Client, *mongo.Database, error) {
	// Get MongoDB URI and database name from environment variables
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		return nil, nil, fmt.Errorf("MONGODB_URI is not set in the environment variables")
	}

	databaseName := os.Getenv("MONGODB_DATABASE")
	if databaseName == "" {
		return nil, nil, fmt.Errorf("MONGODB_DATABASE is not set in the environment variables")
	}

	// Client options
	clientOptions := options.Client().ApplyURI(mongoURI)

	// Context for the connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, nil, fmt.Errorf("error connecting to MongoDB: %v", err)
	}

	// Ping the database to verify connection
	if err := client.Ping(ctx, nil); err != nil {
		return nil, nil, fmt.Errorf("failed to ping MongoDB: %v", err)
	}

	log.Println("Successfully connected to MongoDB!")

	// Return the MongoDB client and database
	return client, client.Database(databaseName), nil
}

// initializeCollections ensures that the required collections and indexes exist
func initializeCollections(db *mongo.Database) error {
	// Check or create "userscollection" and ensure its indexes
	collection := db.Collection("userscollection")
	if err := ensureUsersCollectionIndexes(collection); err != nil {
		return fmt.Errorf("failed to initialize userscollection: %v", err)
	}

	log.Println("Collections and indexes initialized successfully")
	return nil
}

// ensureUsersCollectionIndexes ensures required indexes for the users collection
func ensureUsersCollectionIndexes(collection *mongo.Collection) error {
	// Create a unique index for the "email" field
	indexModel := mongo.IndexModel{
		Keys:    bson.D{{Key: "email", Value: 1}},
		Options: options.Index().SetUnique(true),
	}

	// Create the index
	_, err := collection.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {
		return fmt.Errorf("failed to create unique index on 'email': %v", err)
	}

	log.Println("Unique index on 'email' field ensured")
	return nil
}
