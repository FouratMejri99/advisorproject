import { Cancel, CheckCircle } from "@mui/icons-material"; // ✅ Import Icons
import {
  Box,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const AdvisorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("advisorRequests")) || [];

    // Filter only requests for the logged-in advisor
    const loggedInAdvisor = JSON.parse(localStorage.getItem("currentAdvisor"));
    if (loggedInAdvisor) {
      const filteredRequests = storedRequests.filter(
        (req) => req.advisorId === loggedInAdvisor.id
      );
      setRequests(filteredRequests);
    }
  }, []);

  // Accept request
  const handleAccept = (id) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "accepted" } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("advisorRequests", JSON.stringify(updatedRequests));
  };

  // Reject request
  const handleReject = (id) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "rejected" } : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("advisorRequests", JSON.stringify(updatedRequests));
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
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Incoming Requests
        </Typography>

        {requests.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No requests received.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Client Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Property Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Price Range (€)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Living Area (m²)</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Postal Code</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((req) => {
                  const property = req.propertyDetails || {};

                  return (
                    <TableRow key={req.id}>
                      <TableCell>{req.clientName}</TableCell>
                      <TableCell>{property.propertyType || "N/A"}</TableCell>
                      <TableCell>
                        €{property.priceRange?.[0] || "N/A"} - €
                        {property.priceRange?.[1] || "N/A"}
                      </TableCell>
                      <TableCell>
                        {property.livingArea?.[0] || "N/A"} -{" "}
                        {property.livingArea?.[1] || "N/A"}
                      </TableCell>
                      <TableCell>{property.postalCode || "N/A"}</TableCell>
                      <TableCell>
                        <Typography
                          color={
                            req.status === "pending"
                              ? "warning.main"
                              : req.status === "accepted"
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {req.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {req.status === "pending" && (
                          <>
                            {/* ✅ Accept Icon */}
                            <IconButton
                              color="success"
                              onClick={() => handleAccept(req.id)}
                            >
                              <CheckCircle />
                            </IconButton>

                            {/* ❌ Reject Icon */}
                            <IconButton
                              color="error"
                              onClick={() => handleReject(req.id)}
                            >
                              <Cancel />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default AdvisorDashboard;
