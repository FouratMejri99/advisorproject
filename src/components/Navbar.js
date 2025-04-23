import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setUserType(null);
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent dark background
        padding: "0.5rem 2rem", // padding for spacing
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0, // positioning the navbar from the top
        left: 0,
        right: 0,
        zIndex: 1000, // ensuring it stays on top
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // subtle box-shadow
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              fontFamily: "Montserrat, sans-serif",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "1.5rem", color: "white" }}>
              Energy Advisor website
            </span>
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {userType === "advisor" && (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
              </>
            )}

            {userType === "admin" && (
              <Button color="inherit" component={Link} to="/admin">
                Admin Panel
              </Button>
            )}

            {!userType && (
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            )}

            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {userType === null ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      handleMenuClose();
                    }}
                  >
                    Login as Admin
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/loginadvisor");
                      handleMenuClose();
                    }}
                  >
                    Login as Advisor
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
