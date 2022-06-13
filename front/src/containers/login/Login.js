import React from "react";
import "./login.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { LoginForm } from "../../components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Paper elevation={2}>
      <Box component="div" className="login-container" sx={{ p: 2 }}>
        <Typography component="h3" variant="h4">
          Login into your account
        </Typography>
        <Box component="div" className="login-p">
          <Typography component="p" variant="body1">
            If you wish to create a personal watchlist, rate movies, write
            reviews and discuss on our forum, you will need to login to your
            personal account. If you don't have an account you can sign up for
            free by
            <Link to="/signup" className="login-signup">
              &nbsp;clicking here
            </Link>
            .
          </Typography>
        </Box>
        <br/>
        <LoginForm />
      </Box>
    </Paper>
  );
};

export default Login;
