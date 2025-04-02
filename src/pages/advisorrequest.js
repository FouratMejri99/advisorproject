import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// Fetch all advisors data
const fetchAdvisors = () => {
  return JSON.parse(localStorage.getItem("advisors")) || [];
};

const AdvisorRequest = () => {
  const [advisor, setAdvisor] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const loggedInAdvisor = JSON.parse(localStorage.getItem("currentAdvisor"));
    if (loggedInAdvisor) {
      const advisors = fetchAdvisors();
      const foundAdvisor = advisors.find(
        (adv) => adv.id === loggedInAdvisor.id
      );
      if (foundAdvisor) {
        setAdvisor(foundAdvisor);
        setProperties(foundAdvisor.properties || []);
      }
    }
  }, []);

  const handleRequest = (advisorId, property) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Random User",
    };

    // Retrieve existing requests
    const requests = JSON.parse(localStorage.getItem("advisorRequests")) || [];

    // Create new request
    const newRequest = {
      id: Date.now(), // Unique ID
      clientName: currentUser.name, // Name of the user who sent the request
      advisorId, // The advisor who will receive the request
      propertyDetails: property, // Property details
      status: "pending", // Initial status
    };

    // Save updated requests
    localStorage.setItem(
      "advisorRequests",
      JSON.stringify([...requests, newRequest])
    );

    console.log("Request sent:", newRequest);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Our energy label advisors selected for you
      </Typography>

      <Grid container spacing={2} direction="column">
        {properties.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No properties found.
          </Typography>
        ) : (
          properties.map((property, index) => (
            <Grid item xs={12} key={index}>
              {/* Rectangular Card - Details on Left, Button on Right */}
              <Card
                style={{
                  width: "100%",
                  height: "150px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                {/* Left Section - Property Details */}
                <CardContent style={{ flex: 3 }}>
                  <Typography variant="h6" component="div">
                    {property.propertyType}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price Range:</strong> €{property.priceRange[0]} - €
                    {property.priceRange[1]}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Living Area:</strong> {property.livingArea[0]} -{" "}
                    {property.livingArea[1]} m²
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Postal Code:</strong> {property.postalCode}
                  </Typography>
                </CardContent>

                {/* Right Section - Request Button */}
                <CardActions style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRequest(advisor.id, property)}
                  >
                    Request
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AdvisorRequest;
