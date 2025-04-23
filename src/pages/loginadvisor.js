import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdvisor = ({ setUserType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginadvisor = () => {
    const advisors = JSON.parse(localStorage.getItem("advisors")) || [];

    const foundAdvisor = advisors.find(
      (advisor) =>
        advisor.username === username && advisor.password === password
    );

    if (foundAdvisor) {
      setUserType("advisor");
      localStorage.setItem("currentAdvisor", JSON.stringify(foundAdvisor));
      navigate("/advisorcreaterequest");
    } else {
      setError("Invalid username or password");
    }
  };

  const goToSignUp = () => {
    navigate("/signadvisor");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: "center", color: "#333" }}
          >
            Login as Advisor
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
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
            sx={{ mb: 3 }}
          />
          <Button variant="contained" onClick={loginadvisor} fullWidth>
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={goToSignUp}
            fullWidth
            sx={{ mt: 2 }}
          >
            Go to Sign Up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginAdvisor;
