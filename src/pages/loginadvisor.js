import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdvisor = ({ setUserType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginadvisor = () => {
    // Fetch stored advisors from localStorage
    const advisors = JSON.parse(localStorage.getItem("advisors")) || [];

    // Find the advisor that matches the entered username and password
    const foundAdvisor = advisors.find(
      (advisor) =>
        advisor.username === username && advisor.password === password
    );

    if (foundAdvisor) {
      // If found, set the user type as advisor and navigate to the advisor dashboard
      setUserType("advisor");
      // Store the logged-in advisor's username in localStorage
      localStorage.setItem("currentAdvisor", JSON.stringify(foundAdvisor));
      navigate("/advisorcreaterequest"); // Redirect to the Advisor Dashboard
    } else {
      // If not found, show an error
      setError("Invalid username or password");
    }
  };

  const goToSignUp = () => {
    // Navigate to the Sign Up (Signadvisor) page
    navigate("/signadvisor"); // Redirect to the Signadvisor (sign up) page
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login as Advisor
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={loginadvisor} fullWidth>
        Login
      </Button>
      <Button variant="outlined" onClick={goToSignUp} fullWidth sx={{ mt: 2 }}>
        Go to Sign Up
      </Button>
    </Container>
  );
};

export default LoginAdvisor;
