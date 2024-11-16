import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const lightColor = "rgba(255, 255, 255, 0.7)";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80, // Increased height
  "@media all": {
    minHeight: 80,
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix for Safari
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
  color: theme.palette.primary.main, // Adjust text color as needed
}));

function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                User Dashboard
              </Typography>
            </Grid>
            <Grid item>
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Log out
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar
                  src="/static/images/avatar/1.jpg"
                  alt="My Avatar"
                  sx={{ width: 40, height: 40 }} // Slightly larger avatar
                />
              </IconButton>
            </Grid>
          </Grid>
        </StyledToolbar>
      </StyledAppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
