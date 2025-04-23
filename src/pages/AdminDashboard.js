import {
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const initialDisputes = [
  { id: 1, user: "Alice Brown", advisor: "John Doe", status: "Open" },
  { id: 2, user: "David Wilson", advisor: "Jane Smith", status: "Open" },
  { id: 3, user: "Emma Johnson", advisor: "Mike Johnson", status: "Open" },
  { id: 4, user: "Liam Scott", advisor: "Sarah White", status: "Open" },
  { id: 5, user: "Olivia Green", advisor: "James Miller", status: "Open" },
  { id: 6, user: "Noah Lee", advisor: "Rachel Adams", status: "Open" },
  { id: 7, user: "Ava Lewis", advisor: "Robert Clark", status: "Open" },
  { id: 8, user: "Ethan Turner", advisor: "Emily Walker", status: "Open" },
  { id: 9, user: "Sophia Harris", advisor: "William Hall", status: "Open" },
  { id: 10, user: "Mason Young", advisor: "Grace Allen", status: "Open" },
  { id: 11, user: "Isabella King", advisor: "Henry Wright", status: "Open" },
  { id: 12, user: "Lucas Hill", advisor: "Chloe Scott", status: "Open" },
  { id: 13, user: "Mia Baker", advisor: "Daniel Lewis", status: "Open" },
  { id: 14, user: "Logan Reed", advisor: "Victoria Evans", status: "Open" },
  { id: 15, user: "Charlotte Cook", advisor: "Anthony Parker", status: "Open" },
  { id: 16, user: "Elijah Barnes", advisor: "Lily Price", status: "Open" },
  { id: 17, user: "Amelia Ross", advisor: "Matthew Long", status: "Open" },
  { id: 18, user: "Benjamin Morgan", advisor: "Zoe Gray", status: "Open" },
];

const AdminDashboard = () => {
  const [disputes, setDisputes] = useState(initialDisputes);

  const resolveDispute = (id) => {
    setDisputes((prevDisputes) =>
      prevDisputes.map((dispute) =>
        dispute.id === id ? { ...dispute, status: "Close" } : dispute
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Advisor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disputes.map((dispute, index) => (
              <TableRow
                key={dispute.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <TableCell>{dispute.user}</TableCell>
                <TableCell>{dispute.advisor}</TableCell>
                <TableCell>
                  <Chip
                    label={dispute.status}
                    color={dispute.status === "Close" ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {dispute.status === "Open" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => resolveDispute(dispute.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
