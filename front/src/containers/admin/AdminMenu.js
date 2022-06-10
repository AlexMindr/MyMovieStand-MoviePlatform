import React from "react";
import { Link } from "react-router-dom";
import "./adminmenu.css";
import { Box, Typography, Paper, Divider } from "@mui/material";

const AdminMenu = () => {
  return (
    <Paper elevation={2} sx={{ minHeight: "70vh" }}>
      <Typography component="h2" variant="h3" className="Container-title">
        Admin Dashboard
      </Typography>
      <Divider flexItem />
      <Box className="Box-admin-menu">
        <Link to={"/admin/forum"}>Forum</Link>
        <Link to={"/admin/movie"}>Movies</Link>
        <Link to={"/admin/news"}>News</Link>
        <Link to={"/admin/user"}>Users</Link> 
      </Box>
    </Paper>
  );
};

export default AdminMenu;
