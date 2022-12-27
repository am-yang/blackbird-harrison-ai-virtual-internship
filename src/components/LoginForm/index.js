import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordCaseError, setPasswordCaseError] = useState(false);
  const [passwordNumericalError, setPasswordNumericalError] = useState(false);
  const [passwordSpecialCharError, setPasswordSpecialCharError] =
    useState(false);

  let emailIsValid = true;
  let passwordLengthIsValid = true;
  let passwordCaseIsValid = true;
  let passwordNumberIsValid = true;
  let passwordSpecialCharIsValid = true;

  const validateForm = (event) => {
    setEmailError(false);
    setPasswordLengthError(false);
    setPasswordCaseError(false);
    setPasswordNumericalError(false);
    setPasswordSpecialCharError(false);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Add validation code here
    var email_validator = require("email-validator");

    if (!email_validator.validate(email)) {
      setEmailError(true);
      emailIsValid = false;
    }

    if (password === null || password.length < 8) {
      setPasswordLengthError(true);
      passwordLengthIsValid = false;
    } else if (!(/[A-Z]/.test(password) && /[a-z]/.test(password))) {
      setPasswordCaseError(true);
      passwordCaseIsValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordNumericalError(true);
      passwordNumberIsValid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordSpecialCharError(true);
      passwordSpecialCharIsValid = false;
    }

    return (
      emailIsValid &&
      passwordLengthIsValid &&
      passwordCaseIsValid &&
      passwordNumberIsValid &&
      passwordSpecialCharIsValid
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (validateForm(event)) {
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              ID="outlined-error"
              helperText={emailError ? "Please enter valid email address" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={
                passwordLengthError ||
                passwordCaseError ||
                passwordNumericalError ||
                passwordSpecialCharError
              }
              ID="outlined-error"
              helperText={
                passwordLengthError
                  ? "Password should be 8 or more characters"
                  : passwordCaseError
                  ? "Password should contain minimum 1 character for both uppercase and lowercase letter"
                  : passwordNumericalError
                  ? "Password should contain minimum 1 digit of numeric value"
                  : passwordSpecialCharError
                  ? "Password should contain minimum 1 special character"
                  : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
