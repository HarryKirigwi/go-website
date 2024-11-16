import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Divider,
  Typography,
  MenuItem,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handlehomePage = () => {
    handleHome();
    scrollToSection("landing");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const whiteLinks = {
    color: "#EEEEEE",
  };

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <Toolbar
          className="toolBar"
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "0",
            maxHeight: 40,
            borderColor: "divider",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginRight: 3, marginLeft: 2, cursor: "pointer" }}
              color="primary"
              onClick={handlehomePage}
            >
              Brilliant{" "}
              <span style={{ color: "rgb(0, 155, 229)" }}>Essays</span>
            </Typography>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem onClick={handlehomePage} sx={{ py: "6px", px: "12px" }}>
                <Typography variant="body2" sx={whiteLinks}>
                  Home
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("services")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" sx={whiteLinks}>
                  Services
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("contact")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" sx={whiteLinks}>
                  Contact
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("faq")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" sx={whiteLinks}>
                  FAQ
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleDashboard}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" sx={whiteLinks}>
                  Blog
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="text"
              size="small"
              component="a"
              onClick={handleLogin}
              target="_blank"
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              component="a"
              onClick={handleSignup}
              target="_blank"
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <IconButton
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                >
                  <MenuItem onClick={() => scrollToSection("services")}>
                    Services
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("contact")}>
                    Contact
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Blog
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogin}>Sign in</MenuItem>
                  <MenuItem onClick={handleSignup}>Sign up</MenuItem>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
