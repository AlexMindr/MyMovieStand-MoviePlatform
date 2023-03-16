import React from "react";
import "./signup.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { SignupForm } from "../../components";
//import { StyledEngineProvider } from '@mui/material/StyledEngineProvider'
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Paper elevation={2}>
      <Box component="div" className="signup-container" sx={{ p: 2 }}>
        <Typography component="h3" variant="h4">
          Create a new account
        </Typography>
        <Box component="div" className="signup-p">
          <Typography variant="body1" component="p">
            Signing up for an account is free and easy. Fill out the form below
            to get started.
          </Typography>
          <Typography component="p" variant="body2" className="signup-login-p">
            If you already have an account you can login by
            <Link to="/login" className="signup-login">
              &nbsp;clicking here
            </Link>
            .
          </Typography>
        </Box>
        <SignupForm />
      </Box>
    </Paper>
  );
};

export default Signup;
