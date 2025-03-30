import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// Function to generate a random username
const generateRandomUsername = () => {
  const randomNames = ["John", "Jane", "Alex", "Chris", "Taylor", "Sam"];
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${
    randomNames[Math.floor(Math.random() * randomNames.length)]
  }${randomSuffix}`;
};

const Home = () => {
  const [postalCode, setPostalCode] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [advisors, setAdvisors] = useState([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch advisors from localStorage when the component mounts
  useEffect(() => {
    const storedAdvisors = JSON.parse(localStorage.getItem("advisors")) || [];
    setAdvisors(storedAdvisors);
    setFilteredAdvisors(storedAdvisors); // Initially show all advisors
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const results = advisors.filter(
      (advisor) =>
        (postalCode ? advisor.postalCode === postalCode : true) &&
        (apartmentType ? advisor.apartmentType === apartmentType : true)
    );
    setFilteredAdvisors(results);
  };

  // Handle the "Request Service" functionality
  const handleRequestService = (advisorId) => {
    const randomUsername = generateRandomUsername();

    // Update the advisor's data to include the new request
    const updatedAdvisors = advisors.map((advisor) => {
      if (advisor.id === advisorId) {
        const updatedAdvisor = { ...advisor };
        // Initialize requests array if it doesn't exist
        updatedAdvisor.requests = updatedAdvisor.requests || [];
        // Add the new request to this advisor's requests
        updatedAdvisor.requests.push(randomUsername);
        return updatedAdvisor;
      }
      return advisor;
    });

    // Update localStorage with the new data
    localStorage.setItem("advisors", JSON.stringify(updatedAdvisors));
    setAdvisors(updatedAdvisors); // Update the state to re-render the component

    // Show alert with the request confirmation
    setSnackbarMessage(
      `Request from ${randomUsername} sent to Advisor ${advisorId}`
    );
    setOpenSnackbar(true);
  };

  // Close the Snackbar alert
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        label="Select Apartment Type"
        variant="outlined"
        fullWidth
        value={apartmentType}
        onChange={(e) => setApartmentType(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="House">House</MenuItem>
        <MenuItem value="Apartment">Apartment</MenuItem>
        <MenuItem value="Condo">Condo</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {filteredAdvisors.length > 0 ? (
          filteredAdvisors.map((advisor) => (
            <Grid item xs={12} sm={6} md={4} key={advisor.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{advisor.username}</Typography>
                  <Typography variant="body1">
                    Price: ${advisor.price}
                  </Typography>
                  <Typography variant="body2">
                    Apartment Type: {advisor.apartmentType}
                  </Typography>
                  <Typography variant="body2">
                    Postal Code: {advisor.postalCode}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                    onClick={() => handleRequestService(advisor.id)} // Trigger the request service action
                  >
                    Request Service
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 3 }}>
            No advisors found.
          </Typography>
        )}
      </Grid>

      {/* Snackbar Alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Show alert for 3 seconds
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
