import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { themeSettings } from "@/theme";
import Scrollbtn from "@/shared/Scrollbtn";
import Footer from "@/scenes/global/Footer";
import Navbar from "@/scenes/global/Navbar";
import Header from "@/scenes/global/Header";

export default function Layout() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <header>
          <Header />
          <Navbar />
        </header>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            height: "100%",
            bgcolor: themeSettings.palette.background.light,
          }}
        >
          <Outlet />
        </Container>

        <Scrollbtn />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
