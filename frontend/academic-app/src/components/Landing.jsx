import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Zoom } from "react-awesome-reveal";
import "../styles/Landing.css";

// Custom styles
const styles = {
  landingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  content: {
    textAlign: "center",
  },
  highlightText: {
    color: "orangered",
  },
  priceHighlight: {
    color: "orange",
  },
};

export default function LandingPage() {
  // Use theme and media queries for responsive design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // State for counter animation
  const [counterOn, setCounterOn] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Handler for login/order button
  const handleLogin = () => {
    navigate("/login");
  };

  const handleOrder = () =>{
    navigate("/dashboard");
  }

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <Box className="landing-container">
        <Container maxWidth="lg" sx={styles.landingContainer}>
          <Zoom duration={1500}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Box sx={styles.content}>
                  {/* Main heading */}
                  <Typography
                    variant={isTablet ? "h4" : "h2"}
                    component="h1"
                    gutterBottom
                    fontWeight={800}
                    color="primary"
                  >
                    Get custom and{" "}
                    <Box component="span" sx={styles.highlightText}>
                      affordable{" "}
                    </Box>
                    essay writing service
                  </Typography>

                  {/* Subheading */}
                  <Typography
                    variant={isMobile ? "body2" : "body1"}
                    color="secondary"
                    sx={{ fontWeight: 400, mb: 4 }}
                  >
                    We offer expert assistance with all types of essays
                    <Box component="span" sx={styles.priceHighlight}>
                      {" "}
                      starting from $8.49
                    </Box>
                    . Our team of experienced writers ensures that you receive
                    well-researched and professionally written essays that will
                    help you excel in your studies.
                  </Typography>

                  {/* Counter */}
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    {counterOn && (
                      <CountUp start={0} end={300} duration={2} delay={0} />
                    )}
                    + Happy customers
                  </Typography>

                  {/* Action buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      size={isMobile ? "small" : "medium"}
                      onClick={handleOrder}
                    >
                      Order Now
                    </Button>

                    <Button
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      onClick={handleLogin}
                    >
                      Sign In
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Zoom>
        </Container>
      </Box>
    </ScrollTrigger>
  );
}
