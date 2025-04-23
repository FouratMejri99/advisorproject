import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UserRequest = () => {
  const [contactPerson, setContactPerson] = useState("self");
  const [previousRequest, setPreviousRequest] = useState("no");
  const [salutation, setSalutation] = useState("Mr.");
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [infix, setInfix] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [additionalExplanation, setAdditionalExplanation] = useState("");

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <Box sx={{ padding: 3, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom align="center">
          Your Application
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              For which address do you want an energy label?
            </Typography>

            <TextField
              label="Postal Code"
              fullWidth
              margin="dense"
              defaultValue="1234AB"
            />
            <TextField
              label="House number"
              fullWidth
              margin="dense"
              defaultValue="10"
            />
            <TextField
              label="Addition"
              fullWidth
              margin="dense"
              defaultValue="A"
            />
            <TextField
              label="Street name"
              fullWidth
              margin="dense"
              defaultValue="Place"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Billing address is different than above"
              sx={{ marginTop: 2 }}
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Application by
            </Typography>
            <RadioGroup
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              row
            >
              <FormControlLabel
                value="self"
                control={<Radio />}
                label="I am the contact person for the building survey"
              />
              <FormControlLabel
                value="someoneElse"
                control={<Radio />}
                label="Someone else is the contact person for the building survey"
              />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Your data
            </Typography>

            <FormControl fullWidth margin="dense">
              <InputLabel>Salutation</InputLabel>
              <Select
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Company name (optional)"
              fullWidth
              margin="dense"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label="First name"
              fullWidth
              margin="dense"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Infix"
              fullWidth
              margin="dense"
              value={infix}
              onChange={(e) => setInfix(e.target.value)}
            />
            <TextField
              label="Surname"
              fullWidth
              margin="dense"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              label="Phone number"
              fullWidth
              margin="dense"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Email address"
              fullWidth
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Typography variant="body2" gutterBottom>
              Have you previously submitted a request to us?
            </Typography>
            <RadioGroup
              value={previousRequest}
              onChange={(e) => setPreviousRequest(e.target.value)}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Additional explanation
            </Typography>
            <TextField
              label="Is there anything else you would like to add?"
              multiline
              rows={4}
              fullWidth
              value={additionalExplanation}
              onChange={(e) => setAdditionalExplanation(e.target.value)}
            />

            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Optionally indicate whether the application is intended for the
              sale, rental, or new construction of the building or as part of a
              sustainability process.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <FormControlLabel
              control={<Checkbox />}
              label="By confirming this request, you agree to the General Terms and Conditions – Customers."
            />

            <Box sx={{ textAlign: "right", marginTop: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Request Energy Label
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserRequest;
