import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const AdvisorPricingTable = () => {
  const [postalCodeRanges, setPostalCodeRanges] = useState([]);
  const [newRange, setNewRange] = useState({ min: "", max: "" });
  const [prices, setPrices] = useState({});
  const [advisor, setAdvisor] = useState(null);

  useEffect(() => {
    // Get the current advisor from localStorage
    const storedAdvisor = JSON.parse(localStorage.getItem("currentAdvisor"));

    if (storedAdvisor) {
      setAdvisor(storedAdvisor);
      // Get the postal code ranges stored under the advisor
      const storedData =
        JSON.parse(localStorage.getItem("postalPricing")) || [];
      setPostalCodeRanges(storedData);
    }
  }, []);

  const handleAddRange = () => {
    if (newRange.min && newRange.max) {
      const updatedRanges = [...postalCodeRanges, { ...newRange }];
      setPostalCodeRanges(updatedRanges);
      localStorage.setItem("postalPricing", JSON.stringify(updatedRanges));
      setNewRange({ min: "", max: "" });
    }
  };

  const handlePriceChange = (rangeIndex, surface, type, value) => {
    setPrices((prev) => {
      const updatedPrices = { ...prev };
      if (!updatedPrices[rangeIndex]) updatedPrices[rangeIndex] = {};
      if (!updatedPrices[rangeIndex][surface])
        updatedPrices[rangeIndex][surface] = {};
      updatedPrices[rangeIndex][surface][type] = value;
      return updatedPrices;
    });
  };

  const propertyTypes = ["Apartment", "Two Under One Roof", "Detached"];
  const surfaceAreas = ["50-100 m", "100-150 m", "150-200 m"];

  const handleDeleteRange = (rangeIndex) => {
    const updatedRanges = postalCodeRanges.filter(
      (_, index) => index !== rangeIndex
    );
    setPostalCodeRanges(updatedRanges);
    localStorage.setItem("postalPricing", JSON.stringify(updatedRanges));
  };

  const handleCreatePricingData = () => {
    // Create an object with the current pricing data to store under the advisor
    const pricingData = {
      advisorId: advisor.id, // Assuming each advisor has a unique 'id'
      postalCodeRanges,
      prices,
    };

    // Store the data under the advisor's unique ID in localStorage
    localStorage.setItem(
      `advisorPricing-${advisor.id}`,
      JSON.stringify(pricingData)
    );

    // Optionally, show a success message or provide feedback
    alert("Pricing data has been saved successfully!");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {advisor ? (
        <>
          <Typography variant="h4" gutterBottom>
            {advisor.username}'s Postal Code Ranges & Pricing
          </Typography>
          <Typography variant="h6" gutterBottom>
            {advisor.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                label="Min Postal Code"
                fullWidth
                value={newRange.min}
                onChange={(e) =>
                  setNewRange({ ...newRange, min: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Max Postal Code"
                fullWidth
                value={newRange.max}
                onChange={(e) =>
                  setNewRange({ ...newRange, max: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRange}
              >
                Add Range
              </Button>
            </Grid>
          </Grid>

          {postalCodeRanges.map((range, rangeIndex) => (
            <div key={rangeIndex} style={{ marginTop: 20 }}>
              <Typography variant="h6">
                Postal Code: {range.min} - {range.max}
                <Button
                  color="secondary"
                  onClick={() => handleDeleteRange(rangeIndex)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Button>
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Surface Area</TableCell>
                      {propertyTypes.map((type) => (
                        <TableCell key={type}>{type}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {surfaceAreas.map((surface) => (
                      <TableRow key={surface}>
                        <TableCell>{surface}</TableCell>
                        {propertyTypes.map((type) => (
                          <TableCell key={type}>
                            <TextField
                              type="number"
                              value={
                                prices[rangeIndex]?.[surface]?.[type] || ""
                              }
                              onChange={(e) =>
                                handlePriceChange(
                                  rangeIndex,
                                  surface,
                                  type,
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePricingData}
            style={{ marginTop: "20px" }}
          >
            Create Pricing Data
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="error">
          You need to log in first to access the advisor pricing table.
        </Typography>
      )}
    </Container>
  );
};

export default AdvisorPricingTable;
