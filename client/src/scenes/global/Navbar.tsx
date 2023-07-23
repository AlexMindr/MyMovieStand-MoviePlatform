import logo from "@/assets/Logo.png";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Grow from "@mui/material/Grow";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/global/Nav";
import SearchBar from "@/components/global/SearchBar";
import useClickOutside from "@/shared/hooks/clickOutside";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const [menuBars, setMenuBars] = useState<boolean>(false);
  const menuBox = useRef<HTMLInputElement>(null);
  const activeStyle = "active";
  const menuClose = useClickOutside<boolean>;
  menuClose(menuBox, setMenuBars, false);

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
        ref={menuBox}
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
            menuBars={true}
            setMenuBars={setMenuBars}
            activeStyle={activeStyle}
            user={user}
          />
        ) : (
          <Grow
            in={menuBars}
            style={{ transformOrigin: "top left 0" }}
            {...(menuBars ? { timeout: 1000 } : {})}
          >
            <Box position="absolute" top="2.5rem">
              <Nav
                menuBars={menuBars}
                setMenuBars={setMenuBars}
                activeStyle={activeStyle}
                user={user}
                divStyle={{
                  width: "100%",
                  minWidth: "125px",
                  alignItems: "flex-start",
                  justifyContent: "left",
                  paddingBottom: "0.25rem",
                  backgroundImage: `linear-gradient(150deg,${theme.palette.secondary[500]},60%,
                ${theme.palette.primary[500]})`,
                }}
                ulFlexDirection="column"
                ulTextAlign="left"
              />
            </Box>
          </Grow>
        )}
      </Box>
      {/* Search  */}
      <SearchBar flexBasis={{ xs: "80%", sm: "80%", md: "60%", lg: "40%" }} />
    </Box>
  );
};

export default Navbar;
