import React from "react";
import {
  Chip,
  Typography,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import { Roll, Zoom } from "react-awesome-reveal";

// Styles for the Paper components
const paperStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: { xs: 220, sm: 250, md: 200 }, // Responsive height
  padding: 2,
  backgroundColor: "rgba(255, 255, 255, 0.4)",
};

// Array of services for easy management and scalability
const services = [
  {
    icon: <FindInPageOutlinedIcon fontSize="large" sx={{ marginBottom: 2 }} />,
    title: "Research paper",
    description:
      "Our experienced writers can assist you with comprehensive research papers that are well-researched and properly formatted.",
  },
  {
    icon: <SchoolOutlinedIcon fontSize="large" sx={{ marginBottom: 2 }} />,
    title: "Case Studies",
    description:
      "Thorough examination of real-life scenarios and their implications for further study.",
  },
  {
    icon: <EditNoteOutlinedIcon fontSize="large" sx={{ marginBottom: 2 }} />,
    title: "Essay Editing",
    description:
      "Already have an essay written? Our professional editors can review and polish your work to ensure it meets the highest academic standards.",
  },
];

export function Services() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Navigation handlers
  const handleSignup = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  return (
    <Zoom duration={500}>
      <div className="services" id="services">
        {/* Top section with title and description */}
        <div className="top-section">
          <Chip
            label="Best Writers Ever"
            variant="contained"
            color="primary"
            size={isMobile ? "small" : "large"}
          />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ marginTop: 4, fontWeight: 700 }}
            gutterBottom
            color="primary"
            className="wide-range"
          >
            Wide Range of Academic Writing Services
          </Typography>
          <Typography
            variant="body1"
            color="secondary"
            className="wide-info"
            sx={{ textAlign: "center", maxWidth: "80%", margin: "0 auto" }}
          >
            We offer a variety of academic writing services including essay
            writing, research paper assistance, editing, and proofreading.
          </Typography>
        </div>

        {/* Middle section with service cards */}
        <div className="middle-section">
          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Roll duration={500 * (index + 1)}>
                  <Paper elevation={3} sx={paperStyles}>
                    {service.icon}
                    <Typography variant="h6" color="primary">
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {service.description}
                    </Typography>
                  </Paper>
                </Roll>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Bottom section with action buttons */}
        <div className="bottom-section">
          <Button variant="outlined" onClick={handleLogin} sx={{ mr: 2 }}>
            Order Now
          </Button>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRightOutlinedIcon />}
            onClick={handleSignup}
          >
            Get started
          </Button>
        </div>
      </div>
    </Zoom>
  );
}

// CSS styles
const styles = `
.services {
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-bottom: 2rem;
}

.middle-section {
  margin-top: 2rem;
}

.bottom-section {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

@media (max-width: 600px) {
  .services {
    padding: 1rem;
  }

  .bottom-section {
    flex-direction: column;
    align-items: center;
  }

  .bottom-section button {
    margin-top: 1rem;
    width: 100%;
  }
}
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
