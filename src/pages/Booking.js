import {
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBooking = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields.");
      return;
    }

    const newBooking = { name, email, phone, address, status: "Pending" };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedBookings = [...existingBookings, newBooking];

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    console.log("Booking request submitted:", newBooking);

    setOpenSnackbar(true); // Show success message

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Book an Energy Advisor
      </Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <TextField
        label="Property Address"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained" color="primary" onClick={handleBooking}>
        Submit Booking Request
      </Button>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Booking request submitted!"
      />
    </Container>
  );
};

export default Booking;
