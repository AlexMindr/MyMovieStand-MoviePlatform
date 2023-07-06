import logo from "@/assets/Logo.png";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef, useState } from "react";
import Nav from "@/components/global/Nav";
import SearchBar from "@/components/global/SearchBar";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const [menuBars, setMenuBars] = useState<boolean>(false);

  const activeStyle = "active";

  const user = { username: "adrianus", fullname: "gabi andr", role: "admin" };
  const isLoggedIn = true;

  return (
    <Box
      display="flex"
      width="100%"
      height={isAboveMd ? "3rem" : "2.5rem"}
      // position="sticky"
      //top="3rem"
      //className={`app__header-navbar ${show ? "" : "navbar--hidden"}`}
      sx={{
        backgroundImage: `linear-gradient(to right,${theme.palette.secondary[500]},
            ${theme.palette.primary[300]})`,
      }}
    >
      {/* Nav */}
      <Box
        display="flex"
        justifyContent="left"
        alignItems="center"
        position="relative"
        flexBasis={{ xs: "20%", sm: "20%", md: "40%", lg: "60%" }}
      >
        {!isAboveMd && (
          <Box display={{ sm: "block", md: "none" }}>
            <IconButton
              onClick={() => {
                setMenuBars((prevMenuBars) => !prevMenuBars);
              }}
            >
              <MenuIcon
                fontSize="large"
                sx={{ color: theme.palette.grey[100] }}
              />
            </IconButton>
          </Box>
        )}
        {isAboveMd && (
          <Box
            sx={{
              "&>a>img": {
                margin: "0.25rem 3rem 0 4rem",
                width: "2.5rem",
                maxHeight: "2.5rem",
              },
            }}
          >
            <Link to="/">
              <img src={logo} alt="logo-mms" />
            </Link>
          </Box>
        )}
        {isAboveMd ? (
          <Nav
            menuBars={menuBars}
            setMenuBars={setMenuBars}
            theme={theme}
            activeStyle={activeStyle}
            user={user}
          />
        ) : (
          <Nav
            menuBars={menuBars}
            setMenuBars={setMenuBars}
            theme={theme}
            activeStyle={activeStyle}
            user={user}
            divStyle={{
              position: "absolute",
              top: "2.5rem",
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "left",
              paddingBottom: "0.25rem",
              backgroundImage: `linear-gradient(150deg,${theme.palette.secondary[500]},60%,
                ${theme.palette.primary[500]})`,
            }}
            ulFlexDirection="column"
            ulTextAlign="left"
          />
        )}
      </Box>
      {/* Search  */}
      <SearchBar
        theme={theme}
        flexBasis={{ xs: "80%", sm: "80%", md: "60%", lg: "40%" }}
      />
    </Box>
  );
};

export default Navbar;
