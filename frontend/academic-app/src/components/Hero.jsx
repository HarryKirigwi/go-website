import "../styles/Hero.css";
import "../App.css";
import { Typography, Button } from "@mui/material/";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import SmallCards from "./SmallCards.jsx";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

export default function Hero() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <Zoom>
      <div className="hero-section">
        <div className="image-section"></div>

        <div className="text-section">
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            Guarantee of high performance
          </Typography>
          <Typography variant="body1" color="secondary" gutterBottom>
            Join thousands of satisfied students who have improved their grades
            and academic performance with our help. Your success story begins
            here!
          </Typography>
          <SmallCards />
          <div className="hero-buttons">
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={handleSignup}
            >
              get started
            </Button>
            <Button endIcon={<KeyboardArrowRightOutlinedIcon />}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Zoom>
  );
}
