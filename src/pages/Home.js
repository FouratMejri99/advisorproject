import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Home = () => {
  const [postalCode, setPostalCode] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", { postalCode, propertyType });
    // Implement API call to fetch advisors
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Find an Energy Advisor
      </Typography>
      <TextField
        label="Enter Postal Code"
        variant="outlined"
        fullWidth
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        select
        label="Select Property Type"
        variant="outlined"
        fullWidth
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="house">House</MenuItem>
        <MenuItem value="apartment">Apartment</MenuItem>
        <MenuItem value="row">Row House</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Container>
  );
};

export default Home;
