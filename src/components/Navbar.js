import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userType, setUserType }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to control the profile menu
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu when the icon is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    setUserType(null); // Reset the login state
    navigate("/"); // Redirect to Home or Login page
    handleMenuClose(); // Close the menu after logout
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to the Login page (Admin or generic login)
    handleMenuClose(); // Close the menu after clicking login
  };

  const handleLoginAsAdvisor = () => {
    navigate("/loginadvisor"); // Redirect to the Login page for Advisor
    handleMenuClose(); // Close the menu after clicking login as advisor
  };

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Energy Advisor Platform
          </Typography>

          {/* Conditionally render the Home button based on userType */}
          {userType !== "advisor" && (
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          )}

          {/* Conditionally render links based on user type */}
          {userType === "advisor" && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/advisorcreaterequest"
              >
                Requests
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Advisor Dashboard
              </Button>
            </>
          )}

          {userType === "admin" && (
            <Button color="inherit" component={Link} to="/admin">
              Admin Dashboard
            </Button>
          )}

          {/* Profile menu for logged-in users */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {userType === null ? (
              <>
                <MenuItem onClick={handleLogin}>Login as Admin</MenuItem>
                <MenuItem onClick={handleLoginAsAdvisor}>
                  Login as Advisor
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
