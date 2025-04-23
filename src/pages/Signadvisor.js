import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        navigate("/loginadvisor");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: "center", color: "#333" }}
          >
            Sign Up as Advisor
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

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
            sx={{ mb: 3 }}
          />

          <Button variant="contained" onClick={handleSignUp} fullWidth>
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signadvisor;
