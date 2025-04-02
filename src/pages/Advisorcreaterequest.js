import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const fetchLoggedInAdvisor = () => {
  return JSON.parse(localStorage.getItem("currentAdvisor"));
};

const fetchAdvisors = () => {
  return JSON.parse(localStorage.getItem("advisors")) || [];
};

const saveAdvisors = (advisors) => {
  localStorage.setItem("advisors", JSON.stringify(advisors));
};

const AdvisorCreateRequest = () => {
  const [currentAdvisor, setCurrentAdvisor] = useState(null);
  const [advisorName, setAdvisorName] = useState("");
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [livingArea, setLivingArea] = useState([50, 150]);
  const [postalCode, setPostalCode] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [addition, setAddition] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const advisor = fetchLoggedInAdvisor();
    if (advisor) {
      setCurrentAdvisor(advisor);
      const advisors = fetchAdvisors();
      const matchedAdvisor = advisors.find((adv) => adv.id === advisor.id);
      if (matchedAdvisor) {
        setAdvisorName(matchedAdvisor.name);
      }
    }
  }, []);

  const handleCreate = () => {
    if (
      !postalCode ||
      !houseNo ||
      !propertyType ||
      !companyName ||
      !currentAdvisor
    )
      return;

    const newProperty = {
      postalCode,
      houseNo,
      addition,
      propertyType,
      priceRange,
      livingArea,
      companyName,
      description,
    };

    let advisors = fetchAdvisors();
    let updatedAdvisors = advisors.map((adv) => {
      if (adv.id === currentAdvisor.id) {
        return {
          ...adv,
          properties: [...(adv.properties || []), newProperty], // Append new property
        };
      }
      return adv;
    });

    saveAdvisors(updatedAdvisors);
    setCurrentAdvisor(
      updatedAdvisors.find((adv) => adv.id === currentAdvisor.id)
    );

    // Reset form fields
    setPostalCode("");
    setHouseNo("");
    setAddition("");
    setPropertyType("");
    setPriceRange([50, 200]);
    setLivingArea([50, 150]);
    setCompanyName("");
    setDescription("");
    setShowDescription(false);
  };

  if (!currentAdvisor) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Please Create Your Label {advisorName}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3, flexDirection: "column" }}>
        <Grid item>
          <TextField
            label="Company Name"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Postal Code"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="House No."
            fullWidth
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Addition"
            fullWidth
            value={addition}
            onChange={(e) => setAddition(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="Type of Property"
            fullWidth
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="Row/Between">Row/Between</MenuItem>
            <MenuItem value="Corner/Semi-Detached House">
              Corner/Semi-Detached House
            </MenuItem>
            <MenuItem value="Detached">Detached</MenuItem>
          </TextField>
        </Grid>

        {/* Price Range Slider */}
        <Grid item>
          <Typography gutterBottom>Price Range (€)</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={50}
            max={500}
            step={50}
          />
        </Grid>

        {/* Living Area Slider */}
        <Grid item>
          <Typography gutterBottom>Living Area (m²)</Typography>
          <Slider
            value={livingArea}
            onChange={(e, newValue) => setLivingArea(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={250}
            step={50}
            marks={[
              { value: 0, label: "0-50 m²" },
              { value: 50, label: "50-100 m²" },
              { value: 100, label: "100-150 m²" },
              { value: 150, label: "150-200 m²" },
              { value: 200, label: "200-250 m²" },
              { value: 250, label: "250 m² +" },
            ]}
          />
        </Grid>

        {/* Description Checkbox and Input */}
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={showDescription}
                onChange={() => setShowDescription(!showDescription)}
              />
            }
            label="Add Description"
          />
        </Grid>

        {showDescription && (
          <Grid item>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        )}
      </Grid>

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create
      </Button>
    </Container>
  );
};

export default AdvisorCreateRequest;
