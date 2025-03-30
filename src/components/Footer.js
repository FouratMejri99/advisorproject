import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 3,
        backgroundColor: "#f8f8f8",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          © 2025 Energy Advisor Platform. All Rights Reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Designed by Fourat Mejri
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
