package models

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type User struct {
	ID             string `json:"id"`
	Email          string `json:"email"`
	Password       string `json:"-"`
	FavoritePhrase string `json:""`
}
