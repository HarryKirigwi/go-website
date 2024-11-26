// auth.go
package auth

import (
	"context"
	"os"
	"strings"
	"time"

	"github.com/HarryKirigwi/go-website/backend/config"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

// User struct for MongoDB documents
type User struct {
	ID        string `bson:"_id,omitempty" json:"id"`
	Email     string `bson:"email" json:"email"`
	Password  string `bson:"password" json:"-"`
	Role      string `bson:"role" json:"role"`
	FirstName string `bson:"firstName" json:"firstName"`
	LastName  string `bson:"lastName" json:"lastName"`
}

// Declare JWTSecret
var JWTSecret string

// Initialize JWTSecret in init()
func init() {
	JWTSecret = os.Getenv("JWT_SECRET")
	if JWTSecret == "" {
		JWTSecret = "default-secret-for-dev" // Use a default for development
	}
}

// LoginRequest struct for login payload
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// CheckPasswordHash verifies a hashed password against a plain-text password
func CheckPasswordHash(plainPassword, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}

// HashPassword generates a bcrypt hash for a plain-text password
func HashPassword(plainPassword string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)
	return string(bytes), err
}

// Login handler
func Login(c *fiber.Ctx) error {
	var req LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Get users collection
	collection := config.ConnectDatabase().Database().Collection("users")

	// Find user
	var user User
	err := collection.FindOne(context.Background(), bson.M{"email": req.Email}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Check password
	if !CheckPasswordHash(req.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Generate token
	token, err := generateJWT(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not login"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token": token,
		"role":  user.Role,
	})
}

func AuthMiddleware(role string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Get token from Authorization header
		auth := c.Get("Authorization")
		if auth == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing authorization header"})
		}

		// Remove "Bearer " prefix if present
		tokenString := strings.TrimPrefix(auth, "Bearer ")

		// Parse and validate token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(JWTSecret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
		}

		// Extract claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
		}

		// Verify role if specified
		if role != "" {
			userRole, ok := claims["role"].(string)
			if !ok || userRole != role {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Insufficient permissions"})
			}
		}

		// Store user information in context
		c.Locals("user", claims)
		return c.Next()
	}
}

func generateJWT(user *User) (string, error) {
	claims := jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(JWTSecret))
}
