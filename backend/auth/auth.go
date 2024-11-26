// package auth

// import (
// 	"time"

// 	"github.com/HarryKirigwi/go-website/backend/config"
// 	"github.com/HarryKirigwi/go-website/backend/models"
// 	"github.com/gofiber/fiber/v2"
// 	"github.com/golang-jwt/jwt/v4"
// )

// // Struct for login request
// type LoginRequest struct {
// 	Email    string `json:"email" validate:"required,email"`
// 	Password string `json:"password" validate:"required"`
// }

// // Login handler
// func Login(c *fiber.Ctx) error {
// 	var req LoginRequest
// 	// Parse and validate request body
// 	if err := c.BodyParser(&req); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
// 	}

// 	// Retrieve user from database
// 	user := new(models.User)
// 	if err := config.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
// 	}

// 	// Check hashed password
// 	if !models.CheckPasswordHash(req.Password, user.Password) {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
// 	}

// 	// Generate JWT token
// 	token, err := generateJWT(user)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not log in"})
// 	}

// 	// Return JWT token and user role
// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{"token": token, "role": user.Role})
// }

// // Middleware to protect routes
// func AuthMiddleware(role string) fiber.Handler {
// 	return func(c *fiber.Ctx) error {
// 		// Extract token from Authorization header
// 		tokenStr := c.Get("Authorization")
// 		if tokenStr == "" {
// 			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
// 		}

// 		// Parse token with claims
// 		claims := new(jwt.MapClaims)
// 		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
// 			return []byte(config.JWTSecret), nil
// 		})

// 		if err != nil || !token.Valid {
// 			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
// 		}

// 		// Check role if specified
// 		if role != "" && (*claims)["role"] != role {
// 			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Access denied"})
// 		}

// 		// Store user claims in context for downstream use
// 		c.Locals("user", claims)
// 		return c.Next()
// 	}
// }

// // Helper function to generate JWT
// func generateJWT(user *models.User) (string, error) {
// 	claims := jwt.MapClaims{
// 		"id":    user.ID,
// 		"email": user.Email,
// 		"role":  user.Role,
// 		"exp":   time.Now().Add(24 * time.Hour).Unix(), // Token expires in 24 hours
// 	}

// 	// Generate signed token
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	return token.SignedString([]byte(config.JWTSecret))
// }

// auth.go
package auth

import (
	"strings"
	"time"

	"context"

	"github.com/HarryKirigwi/go-website/backend/config"
	"github.com/HarryKirigwi/go-website/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
)

// Login handler
func Login(c *fiber.Ctx) error {
	var req models.LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Get users collection
	collection := config.DB.Collection("users")

	// Find user
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"email": req.Email}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Check password
	if !models.CheckPasswordHash(req.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	// Generate token
	token, err := generateJWT(&user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not login"})
	}

	return c.Status(fiber.StatusOK).JSON(models.LoginResponse{
		Token: token,
		Role:  user.Role,
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
			return []byte(config.JWTSecret), nil
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

func generateJWT(user *models.User) (string, error) {
	claims := jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.JWTSecret))
}
