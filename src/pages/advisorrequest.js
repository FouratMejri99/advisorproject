import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../components/filter";

// Fetch all advisors data
const fetchAdvisors = () => {
  return JSON.parse(localStorage.getItem("advisors")) || [];
};

const AdvisorRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPropertyType = queryParams.get("propertyType") || "";

  const [advisor, setAdvisor] = useState(null);
  const [properties, setProperties] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 10000000]);

  useEffect(() => {
    const loggedInAdvisor = JSON.parse(localStorage.getItem("currentAdvisor"));
    if (loggedInAdvisor) {
      const advisors = fetchAdvisors();
      const foundAdvisor = advisors.find(
        (adv) => adv.id === loggedInAdvisor.id
      );
      if (foundAdvisor) {
        setAdvisor(foundAdvisor);

        let filtered = [...foundAdvisor.properties];

        if (selectedPropertyType) {
          filtered = filtered.filter(
            (p) => p.propertyType === selectedPropertyType
          );
        }

        if (typeFilter) {
          filtered = filtered.filter((p) => p.propertyType === typeFilter);
        }

        filtered = filtered.filter((p) => {
          const price = p.priceRange[1];
          return price >= priceFilter[0] && price <= priceFilter[1];
        });

        setProperties(filtered);
      }
    }
  }, [selectedPropertyType, priceFilter, typeFilter]);

  const filterProperties = (allProperties) => {
    let filtered = [...allProperties];

    if (selectedPropertyType) {
      filtered = filtered.filter(
        (p) => p.propertyType === selectedPropertyType
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((p) => p.propertyType === typeFilter);
    }

    filtered = filtered.filter((p) => {
      const price = p.priceRange[1]; // Use max price in range
      return price >= priceFilter[0] && price <= priceFilter[1];
    });

    setProperties(filtered);
  };

  const handleRequest = (advisorId, property) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
      name: "Random User",
    };

    const requests = JSON.parse(localStorage.getItem("advisorRequests")) || [];

    const newRequest = {
      id: Date.now(),
      clientName: currentUser.name,
      advisorId,
      propertyDetails: property,
      status: "pending",
    };

    localStorage.setItem(
      "advisorRequests",
      JSON.stringify([...requests, newRequest])
    );

    console.log("Request sent:", newRequest);
    navigate("/UserRequest");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        pt: 10, // padding top for spacing below navbar (adjust as needed)
        px: 3, // padding left and right (24px each side)
        pb: 6, // optional: bottom padding
      }}
    >
      <Container maxWidth="lg" sx={{ marginTop: "20px", paddingBottom: 6 }}>
        <Grid container spacing={25}>
          {/* Left Sidebar Filter */}
          <Grid
            item
            xs={12} // 100% width on extra small screens
            sm={6} // 50% width on small screens
            md={6} // 50% width on medium screens (increased width)
            lg={6} // 50% width on large screens (increased width)
            sx={{
              borderRadius: "70px",
              padding: 3,
            }}
          >
            <Filter
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />
          </Grid>

          {/* Right Content */}
          <Grid
            item
            xs={12} // 100% width on extra small screens
            sm={6} // 50% width on small screens
            md={12} // 50% width on medium screens (increased width)
            lg={12} // 50% width on large screens (increased width)
            sx={{
              borderRadius: "70px",
              padding: 3,
            }}
          >
            {properties.length === 0 ? (
              <Typography variant="h6" color="textSecondary">
                No properties found for selected type.
              </Typography>
            ) : (
              <Grid container spacing={2} direction="column">
                {properties.map((property, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        borderRadius: "15px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                      }}
                    >
                      <CardContent sx={{ flex: 3 }}>
                        <Typography variant="h6" component="div">
                          {property.propertyType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Price Range:</strong> €
                          {property.priceRange[0]} - €{property.priceRange[1]}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Living Area:</strong> {property.livingArea[0]}{" "}
                          - {property.livingArea[1]} m²
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Postal Code:</strong> {property.postalCode}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ flex: 1, justifyContent: "flex-end" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleRequest(advisor.id, property)}
                          sx={{
                            background:
                              "linear-gradient(to right, #2c5364, #203a43, #2c5364)",
                            color: "white",
                            fontWeight: "bold",
                            "&:hover": {
                              backgroundColor: "#e0e0e0",
                            },
                          }}
                        >
                          To Request
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdvisorRequest;
