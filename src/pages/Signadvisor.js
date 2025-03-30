import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// SignUp Component for Advisor
const Signadvisor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!username || !password || !price || !apartmentType || !postalCode) {
      setError("Please fill in all fields");
      return;
    }

    // You can check if username already exists in localStorage or any database logic.
    const advisors = JSON.parse(localStorage.getItem("advisors")) || [];
    const existingAdvisor = advisors.find(
      (advisor) => advisor.username === username
    );
    if (existingAdvisor) {
      setError("Username already exists");
      return;
    }

    // Generate a unique ID for each advisor
    const newAdvisor = {
      id: advisors.length + 1, // Simple unique id (could be more complex like UUID)
      username,
      password,
      price,
      apartmentType,
      postalCode,
      requests: [], // Initialize an empty array for requests
    };

    // Store new advisor in localStorage
    localStorage.setItem("advisors", JSON.stringify([...advisors, newAdvisor]));
    navigate("/loginadvisor"); // Redirect to login page after sign up
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign Up as Advisor
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Username Field */}
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Password Field */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Price Field */}
      <TextField
        label="Price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Apartment Type Dropdown */}
      <TextField
        select
        label="Apartment Type"
        fullWidth
        value={apartmentType}
        onChange={(e) => setApartmentType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="House">House</MenuItem>
        <MenuItem value="Apartment">Apartment</MenuItem>
        <MenuItem value="Condo">Condo</MenuItem>
      </TextField>

      {/* Postal Code Field */}
      <TextField
        label="Postal Code"
        fullWidth
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Sign Up Button */}
      <Button variant="contained" onClick={handleSignUp} fullWidth>
        Sign Up
      </Button>
    </Container>
  );
};

export default Signadvisor;
