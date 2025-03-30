import {
  Button,
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
  { id: 2, user: "David Wilson", advisor: "Jane Smith", status: "Resolved" },
  { id: 3, user: "Emma Johnson", advisor: "Mike Johnson", status: "Open" },
];

const AdminDashboard = () => {
  const [disputes, setDisputes] = useState(initialDisputes);

  const resolveDispute = (id) => {
    setDisputes((prevDisputes) =>
      prevDisputes.map((dispute) =>
        dispute.id === id ? { ...dispute, status: "Resolved" } : dispute
      )
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Admin Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Advisor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell>{dispute.user}</TableCell>
                <TableCell>{dispute.advisor}</TableCell>
                <TableCell>{dispute.status}</TableCell>
                <TableCell>
                  {dispute.status === "Open" && (
                    <Button
                      variant="contained"
                      color="secondary"
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
