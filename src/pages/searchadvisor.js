import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchAdvisor = () => {
  const query = useQuery();
  const postalCode = query.get("postalCode");
  const houseNo = query.get("houseNo");
  const addition = query.get("addition");
  const propertyType = query.get("propertyType");

  const [advisors, setAdvisors] = useState([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState([]);

  useEffect(() => {
    // Fetch advisors from localStorage (or replace with an API call)
    const storedAdvisors = JSON.parse(localStorage.getItem("advisors")) || [];
    setAdvisors(storedAdvisors);

    // Filter advisors based on search criteria
    const results = storedAdvisors.filter(
      (advisor) =>
        (!postalCode || advisor.postalCode === postalCode) &&
        (!propertyType || advisor.propertyType === propertyType)
    );
    setFilteredAdvisors(results);
  }, [postalCode, houseNo, addition, propertyType]);

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Showing results for:
      </Typography>
      <Typography variant="body1">
        Postal Code: {postalCode || "Any"} | House No.: {houseNo || "Any"} |
        Add.: {addition || "Any"} | Property Type: {propertyType || "Any"}
      </Typography>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        {filteredAdvisors.length > 0 ? (
          filteredAdvisors.map((advisor) => (
            <Grid item xs={12} sm={6} md={4} key={advisor.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{advisor.username}</Typography>
                  <Typography variant="body1">
                    Price: ${advisor.price}
                  </Typography>
                  <Typography variant="body2">
                    Property Type: {advisor.propertyType}
                  </Typography>
                  <Typography variant="body2">
                    Postal Code: {advisor.postalCode}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 3 }}>
            No advisors found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SearchAdvisor;
