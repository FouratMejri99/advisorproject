// Filter.js
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const Filter = ({ priceFilter, setPriceFilter, typeFilter, setTypeFilter }) => {
  const handlePriceFilterChange = (event) => {
    const value = event.target.value;
    setPriceFilter(value);
  };

  const handleTypeFilterChange = (event) => {
    const value = event.target.value;
    setTypeFilter(value);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Filters</Typography>

        {/* Price Filter */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Price Range</InputLabel>
          <Select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            label="Price Range"
          >
            <MenuItem value={[0, 1000000]}>All Prices</MenuItem>
            <MenuItem value={[0, 500000]}>€0 - €500,000</MenuItem>
            <MenuItem value={[500000, 1000000]}>€500,000 - €1,000,000</MenuItem>
            <MenuItem value={[1000000, 10000000]}>€1,000,000+</MenuItem>
          </Select>
        </FormControl>

        {/* Type Filter */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Property Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            label="Property Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Filter;
