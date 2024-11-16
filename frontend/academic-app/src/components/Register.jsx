import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "../styles/Forms.css";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { inputStyles } from "./Login";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const formData = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be 50 characters or less"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be 50 characters or less"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(100, "Email must be 100 characters or less"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be 100 characters or less")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: zodResolver(formData), mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password", "");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const onSubmit = (data) => {
  //   // Check if passwords match before submitting

  //   console.log(data);
  //   reset();
  // };

  const onSubmit = async (data) => {
    console.log(data);  // Check the data
  
    // Send the data to the Go backend
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("User registered:", result);
        reset();  // Reset the form
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };
  

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleHome = () => {
    navigate("/");
  };

  return (
    <section className="signup-box">
      <Box className="signupForm">
        <Box sx={{ textAlign: "end" }}>
          <Button sx={{ cursor: "pointer", mb: 10 }} onClick={handleHome}>
            return home
          </Button>
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
          gutterBottom
          align="center"
        >
          Sign up!
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "white", marginBottom: 3 }}
          align="center"
          onClick={handleLogin}
        >
          Already have an account?
          <span style={{ cursor: "pointer", color: "blue", marginLeft: 5 }}>
            Login
          </span>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="firstName"
                    placeholder="First name"
                    label="First name"
                    required
                    size="small"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={inputStyles}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="lastName"
                    placeholder="Last name"
                    label="Last name"
                    required
                    size="small"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={inputStyles}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="newUserEmail"
                type="email"
                placeholder="Enter your email"
                label="Email"
                required
                size="small"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={inputStyles}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="newUserPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                label="Password"
                required
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="confirmUserPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                label="Confirm password"
                required
                fullWidth
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
            disabled={Object.keys(errors).length > 0}
          >
            Register
          </Button>
        </form>
      </Box>

      <div className="login-image"></div>
    </section>
  );
}
