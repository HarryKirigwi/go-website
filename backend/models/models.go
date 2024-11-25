package models

import (
	"golang.org/x/crypto/bcrypt"
)

// LoginRequest struct defines the expected payload for login requests
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// LoginResponse struct defines the structure for a successful login response
type LoginResponse struct {
	Token string `json:"token"`
	Role  string `json:"role"`
}

// User struct defines the schema for a user in the system
type User struct {
	ID       string `bson:"_id,omitempty" json:"id"`
	Email    string `bson:"email" json:"email"`
	Password string `bson:"password" json:"-"` // Never expose the password in JSON
	Role     string `bson:"role" json:"role"`  // Role defines user privileges, e.g., "admin" or "user"
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
