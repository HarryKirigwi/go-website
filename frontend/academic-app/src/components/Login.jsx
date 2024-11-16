import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../styles/Forms.css";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton } from "@mui/material";
import { Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export const inputStyles = {
  marginTop: 4,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
};

const formData = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleHome = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ resolver: zodResolver(formData) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-container">
      <Box className="login-form" sx={{ p: 4, marginBottom: 5, pt: 5 }}>
        <Box sx={{ textAlign: "end", mb: 10 }}>
          <Button sx={{ cursor: "pointer" }} onClick={handleHome}>
            return home
          </Button>
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
          gutterBottom
          align="center"
        >
          Welcome back!
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "white" }}
          align="center"
          gutterBottom
          onClick={handleSignup}
        >
          Do you have an account yet?{" "}
          <span style={{ cursor: "pointer", color: "blue", marginLeft: 5 }}>
            Create account
          </span>
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                size="small"
                margin="normal"
                sx={inputStyles}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "text" : "password"}
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={inputStyles}
                fullWidth
                size="small"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{ color: "rgb(255,255,255)" }}
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

          <div className="forgot-password-div">
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label="Remember me"
              size="small"
              {...register("remember")}
            />

            <div>
              <a href="/" className="forgot-password">
                <Typography variant="body2" sx={{ color: "blue" }}>
                  Forgot password?
                </Typography>
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>

      <div className="login-image"></div>
    </section>
  );
}
