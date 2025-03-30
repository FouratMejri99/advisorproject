import {
  Button,
  Container,
  MenuItem,
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

const AdvisorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [priceSettings, setPriceSettings] = useState({});

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const savedRequests =
      JSON.parse(localStorage.getItem("advisorRequests")) || savedBookings;

    setRequests(savedRequests);
  }, []);

  // Update and persist booking status
  const updateStatus = (id, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem("advisorRequests", JSON.stringify(updatedRequests));
  };

  // Handle price updates for different house types & regions
  const handlePriceChange = (field, value) => {
    setPriceSettings((prev) => ({ ...prev, [field]: value }));
  };

  const savePriceSettings = () => {
    localStorage.setItem("advisorPricing", JSON.stringify(priceSettings));
    alert("Pricing settings saved!");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Advisor Dashboard
      </Typography>

      {/* Pricing Management Section */}
      <Typography variant="h6" gutterBottom>
        Set Pricing for Services
      </Typography>
      <TextField
        select
        label="House Type"
        variant="outlined"
        fullWidth
        value={priceSettings.houseType || ""}
        onChange={(e) => handlePriceChange("houseType", e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <MenuItem value="Apartment">Apartment</MenuItem>
        <MenuItem value="Villa">Villa</MenuItem>
        <MenuItem value="Townhouse">Townhouse</MenuItem>
      </TextField>
      <TextField
        label="House Size (m²)"
        variant="outlined"
        fullWidth
        type="number"
        value={priceSettings.size || ""}
        onChange={(e) => handlePriceChange("size", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Postal Code"
        variant="outlined"
        fullWidth
        value={priceSettings.postalCode || ""}
        onChange={(e) => handlePriceChange("postalCode", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Set Price ($)"
        variant="outlined"
        fullWidth
        type="number"
        value={priceSettings.price || ""}
        onChange={(e) => handlePriceChange("price", e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={savePriceSettings}>
        Save Pricing
      </Button>

      {/* Bookings Table */}
      <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
        Client Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.address}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateStatus(request.id, "Contacted")}
                    >
                      Mark as Contacted
                    </Button>
                  )}
                  {request.status === "Contacted" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => updateStatus(request.id, "Completed")}
                    >
                      Mark as Completed
                    </Button>
                  )}
                  {request.status === "Completed" && (
                    <Button variant="contained" color="success" disabled>
                      Completed
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdvisorDashboard;
