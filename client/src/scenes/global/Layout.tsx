import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import { themeSettings } from "@/theme";
import Scrollbtn from "@/components/global/Scrollbtn";
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
          disableGutters
          component="main"
          maxWidth="xl"
          sx={{
            minHeight: "100dvh",
            pl: { xs: 3, md: 2, lg: 1, xl: 0 },
            pr: { xs: 3, md: 2, lg: 1, xl: 0 },
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
