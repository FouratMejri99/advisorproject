import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [addition, setAddition] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    navigate(
      `/advisorrequest?postalCode=${postalCode}&houseNo=${houseNo}&addition=${addition}&propertyType=${propertyType}`
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: 4, md: 10 },
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {/* Left Text Section */}
        <Box maxWidth="50%">
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, mb: 3, fontFamily: `'Inter', sans-serif` }}
          >
            Discover Your Perfect Advisor
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            We connect homeowners with the best advisors in your area. Whether
            you're looking for property investment advice or home renovation
            tips, we've got you covered.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#000",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            onClick={() => {
              document
                .getElementById("advisor-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Right Search Card */}
        <Box
          id="advisor-form"
          sx={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: 4,
            width: 400,
            color: "black",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "#fff",
              mb: 4,
              fontFamily: `'Inter', sans-serif`,
            }}
          >
            Find the Best Advisor
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
            />

            <Box display="flex" gap={2}>
              <TextField
                label="House No."
                variant="outlined"
                fullWidth
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                label="Add."
                variant="outlined"
                fullWidth
                value={addition}
                onChange={(e) => setAddition(e.target.value)}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: { color: "#fff" },
                }}
              />
            </Box>

            <TextField
              select
              label="Type of Property"
              variant="outlined"
              fullWidth
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Row/Between">Row/Between</MenuItem>
              <MenuItem value="Corner/Semi-Detached">
                Corner/Semi-Detached
              </MenuItem>
              <MenuItem value="Detached">Detached</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                mt: 2,
                height: 50,
                fontSize: "1.1rem",
                fontWeight: "bold",
                backgroundColor: "#ffffff",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
