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

  const handleSignUp = async () => {
    if (!username || !password || !price || !apartmentType || !postalCode) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/advisors/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            price,
            apartmentType,
            postalCode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
      } else {
        navigate("/loginadvisor"); // Redirect to login page
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sign Up as Advisor
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{ mb: 2 }}
      />

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

      <TextField
        label="Postal Code"
        fullWidth
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleSignUp} fullWidth>
        Sign Up
      </Button>
    </Container>
  );
};

export default Signadvisor;
