import {
  Button,
  Container,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// Function to fetch current logged-in advisor from localStorage
const fetchLoggedInAdvisor = () => {
  return JSON.parse(localStorage.getItem("currentAdvisor"));
};

const AdvisorDashboard = () => {
  const [currentAdvisor, setCurrentAdvisor] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch current advisor data
  useEffect(() => {
    const advisor = fetchLoggedInAdvisor();
    if (advisor) {
      setCurrentAdvisor(advisor);
      setRequests(advisor.requests || []);
    }
  }, []);

  // Handle Price Update
  const handlePriceUpdate = () => {
    if (!newPrice || !apartmentType || !postalCode) return;

    const updatedAdvisor = { ...currentAdvisor };

    // Update price in advisor's data based on apartment type and postal code
    updatedAdvisor.prices = updatedAdvisor.prices || [];
    updatedAdvisor.prices.push({ apartmentType, postalCode, price: newPrice });

    localStorage.setItem("currentAdvisor", JSON.stringify(updatedAdvisor));
    setCurrentAdvisor(updatedAdvisor);
    setNewPrice("");
    setApartmentType("");
    setPostalCode("");
  };

  // Handle Accept Request
  const handleAcceptRequest = (request) => {
    const updatedRequests = requests.map((req) =>
      req.username === request.username ? { ...req, status: "Accepted" } : req
    );
    setRequests(updatedRequests);

    // Optionally, save the updated requests in localStorage if necessary
    const updatedAdvisor = { ...currentAdvisor, requests: updatedRequests };
    localStorage.setItem("currentAdvisor", JSON.stringify(updatedAdvisor));
  };

  // Handle Decline Request
  const handleDeclineRequest = (request) => {
    const updatedRequests = requests.filter(
      (req) => req.username !== request.username
    );
    setRequests(updatedRequests);

    // Optionally, save the updated requests in localStorage if necessary
    const updatedAdvisor = { ...currentAdvisor, requests: updatedRequests };
    localStorage.setItem("currentAdvisor", JSON.stringify(updatedAdvisor));
  };

  // Handle Page Change for Table Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows Per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!currentAdvisor) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Advisor Dashboard
      </Typography>

      {/* Price Update Form */}
      <Typography variant="h6">Set Service Price</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <TextField
            select
            label="Apartment Type"
            fullWidth
            value={apartmentType}
            onChange={(e) => setApartmentType(e.target.value)}
          >
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="Condo">Condo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Postal Code"
            fullWidth
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handlePriceUpdate}>
        Update Price
      </Button>

      {/* Requests Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Your Requests
      </Typography>
      <TableContainer style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                <TableRow key={request.username}>
                  <TableCell>{request.username}</TableCell>
                  <TableCell>${request.price}</TableCell>
                  <TableCell>{request.status || "Pending"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAcceptRequest(request)}
                      disabled={request.status === "Accepted"}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeclineRequest(request)}
                      disabled={request.status === "Declined"}
                      sx={{ ml: 2 }}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default AdvisorDashboard;
