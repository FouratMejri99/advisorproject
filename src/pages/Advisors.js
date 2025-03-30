import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    const storedAdvisors =
      JSON.parse(localStorage.getItem("completedAdvisors")) || [];
    setAdvisors(storedAdvisors);
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Completed Energy Advisors
      </Typography>
      <Grid container spacing={3}>
        {advisors.length > 0 ? (
          advisors.map((advisor) => (
            <Grid item xs={12} sm={6} md={4} key={advisor.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{advisor.name}</Typography>
                  <Typography variant="body1">
                    Price: ${advisor.price}
                  </Typography>
                  <Typography variant="body2">ETA: {advisor.eta}</Typography>
                  <Typography variant="body2">
                    Reviews: {advisor.reviews} ⭐
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    Book Again
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 3 }}>
            No completed advisors found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Advisors;
