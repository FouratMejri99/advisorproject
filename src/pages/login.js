import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple authentication (you can replace this with real authentication logic)
    if (username === "admin" && password === "password") {
      setUserType("admin");
      navigate("/admin"); // Redirect to Admin Dashboard
    } else if (username === "advisor" && password === "password") {
      setUserType("advisor");
      navigate("/dashboard"); // Redirect to Advisor Dashboard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
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
      <Button variant="contained" onClick={handleLogin} fullWidth>
        Login
      </Button>
    </Container>
  );
};

export default Login;
