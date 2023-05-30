import { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { themeSettings } from "@/theme";
import Scrollbtn from "@/shared/Scrollbtn";
import Footer from "@/scenes/global/Footer";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {/* <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<Confirmation />} />
          </Routes>
          <Footer /> */}
        </Router>
        <Scrollbtn />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
