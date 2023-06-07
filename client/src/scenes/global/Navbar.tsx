import logo from "@/assets/Logo.png";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Nav from "@/components/global/Nav";

const Navbar = () => {
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const [menuBars, setMenuBars] = useState<boolean>(false);

  const user = { username: "adrianus", fullname: "gabi andr", role: "admin" };
  const isLoggedIn = true;
  const activeStyle = "active";

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
      <Box
        flexBasis="60%"
        display="flex"
        justifyContent="left"
        alignItems="center"
        position="relative"

        //className="app__navbar-left"
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

      {/* <Box className="app__navbar-right" ref={searchBox}>
        <Box className={searchToggle}>
          <Box className="icon">
            <IconButton
              className="search"
              aria-label="submit search"
              onClick={() =>
                searchToggle === "container2"
                  ? setSearchToggle("container2 active")
                  : setSearchToggle("container2")
              }
            >
              <SearchIcon fontSize="medium" />
            </IconButton>
          </Box>
          <Box className="input">
            <input
              type="text"
              aria-label="search"
              placeholder="Search movie..."
              value={inputSearch ? inputSearch : ""}
              onChange={changeInput}
            />
            <IconButton
              className="clear"
              onClick={() => setInputSearch(() => "")}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          className={
            searchToggle === "container2 active" && inputSearch !== ""
              ? "dropdown-search open"
              : "dropdown-search"
          }
        >
          {/* {searchResult && searchResult.length > 0 ? (
            searchResult.map((movie) => (
              <Link
                onClick={closeSearchClick}
                key={movie.movieid}
                to={`/movies/${movie.movieid}`}
              >
                <MovieSearchList
                  poster={movie.poster_path}
                  title={movie.title}
                />
              </Link>
            ))
          ) : (
            <Button disabled variant="text">
              Nothing matched your search
            </Button>
          )} 
        </Box> 
      </Box>*/}
    </Box>
  );
};

export default Navbar;
