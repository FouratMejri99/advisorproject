import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";

const Filter = ({ priceFilter, setPriceFilter, typeFilter, setTypeFilter }) => {
  // Function to handle slider change
  const handleSliderChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  // Function to format the price range
  const formatPriceRange = (value) => {
    return `€${value[0].toLocaleString()} - €${value[1].toLocaleString()}`;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your data
        </Typography>

        <Box mb={2}>
          <Typography variant="body2">
            <strong>Postcode:</strong> 1234AB
          </Typography>
          <Typography variant="body2">
            <strong>House number:</strong> 10 A
          </Typography>
          <Typography variant="body2">
            <strong>Building type:</strong> House
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="subtitle1" gutterBottom>
          Surface
        </Typography>
        <FormControl fullWidth margin="dense">
          <InputLabel>Living Area</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="small">0 - 50 m²</MenuItem>
            <MenuItem value="medium">50 - 100 m²</MenuItem>
            <MenuItem value="large">150+ m²</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ my: 4 }} />

        {/* Price Range Slider */}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Price Range in euros
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Slider
              value={priceFilter}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `€${value.toLocaleString()}`}
              min={0}
              max={1000}
              step={50}
            />
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: "10px" }}
          >
            {formatPriceRange(priceFilter)}
          </Typography>
        </div>

        <Divider sx={{ my: 4 }} />

        <Typography variant="subtitle1" gutterBottom>
          Methodology
        </Typography>
        <FormControl fullWidth margin="dense">
          <InputLabel>Method</InputLabel>
          <Select>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="basic">Basic methodology</MenuItem>
            <MenuItem value="detailed">Detailed methodology</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Filter;
