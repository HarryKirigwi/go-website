package routes

import (
	"github.com/HarryKirigwi/go-website/backend/auth"
	"github.com/gofiber/fiber/v2"
)

// RegisterRoutes registers all the routes for the application
func RegisterRoutes(app *fiber.App) {
	// Public routes
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).SendString("Welcome to the User Registration API!")
	})

	// Auth routes
	app.Post("/api/login", auth.Login)
	app.Post("/api/register", auth.Register)

	// Protected routes
	app.Get("/api/user/dashboard", auth.AuthMiddleware("user"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the User Dashboard"})
	})

	app.Get("/api/admin/dashboard", auth.AuthMiddleware("admin"), func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Welcome to the Admin Dashboard"})
	})
}
