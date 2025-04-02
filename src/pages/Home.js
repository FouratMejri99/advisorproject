import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
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
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            Find the Best Advisor
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="House No."
                variant="outlined"
                fullWidth
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Add."
                variant="outlined"
                fullWidth
                value={addition}
                onChange={(e) => setAddition(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Type of Property"
                variant="outlined"
                fullWidth
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Row/Between">Row/Between</MenuItem>
                <MenuItem value="Corner/Semi-Detached">
                  Corner/Semi-Detached House
                </MenuItem>
                <MenuItem value="Detached">Detached</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
