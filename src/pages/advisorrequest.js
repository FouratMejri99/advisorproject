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
import { useLocation } from "react-router-dom";

// Fetch all advisors data
const fetchAdvisors = () => {
  return JSON.parse(localStorage.getItem("advisors")) || [];
};

const AdvisorRequest = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPropertyType = queryParams.get("propertyType") || "";

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

        // Filter properties by selectedPropertyType from URL
        const filteredProperties = selectedPropertyType
          ? foundAdvisor.properties.filter(
              (property) => property.propertyType === selectedPropertyType
            )
          : foundAdvisor.properties;

        setProperties(filteredProperties);
      }
    }
  }, [selectedPropertyType]); // Trigger filtering when URL parameter changes

  const handleRequest = (advisorId, property) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Random User",
    };

    // Retrieve existing requests
    const requests = JSON.parse(localStorage.getItem("advisorRequests")) || [];

    // Create new request
    const newRequest = {
      id: Date.now(),
      clientName: currentUser.name,
      advisorId,
      propertyDetails: property,
      status: "pending",
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
            No properties found for selected type.
          </Typography>
        ) : (
          properties.map((property, index) => (
            <Grid item xs={12} key={index}>
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
