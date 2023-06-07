import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import Grow from "@mui/material/Grow";

type Props = {
  setMenuBars: (v: boolean) => void;
  menuBars: boolean;
  theme: Theme;
  activeStyle: string;
  user?: { role: string };
  divStyle?: {
    position?: string;
    width?: string;
    top?: string;
    alignItems?: string;
    justifyContent?: string;
    paddingBottom?: string;
    backgroundImage?: string;
  };
  ulFlexDirection?: string;
  ulTextAlign?: string;
};

const Nav = ({
  menuBars,
  setMenuBars,
  theme,
  activeStyle,
  user,
  divStyle,
  ulFlexDirection = "row",
  ulTextAlign = "center",
}: Props) => {
  return (
    <Grow
      in={menuBars}
      style={{ transformOrigin: "0 0 0" }}
      {...(menuBars ? { timeout: 1000 } : {})}
    >
      <Box
        display={menuBars ? "flex" : "none"}
        sx={{
          ...divStyle,
        }}
        //className="app__navbar-left_nav"
      >
        <Box
          component="nav"
          width="100%"
          onBlur={() => {
            setMenuBars(false);
          }}
        >
          <Box
            component="ul"
            display="flex"
            fontSize="1.1rem"
            boxSizing="border-box"
            //className="app__navbar-left_nav_menu"
            sx={{
              paddingInlineStart: 0,
              flexDirection: ulFlexDirection,
              listStyleType: "none",
              "&>li>a": {
                textAlign: ulTextAlign,
                textDecoration: "none",
                fontWeight: "bold",
                color: theme.palette.grey[100],
                marginLeft: "1.5rem",
                width: "80%",
                display: "inline-block",
                boxSizing: "border-box",
              },
              "&>li>a:hover": { color: theme.palette.tertiary[400] },
              "&>li>.active": { color: theme.palette.background.hover },
              "&>li>.active:hover": {
                color: theme.palette.tertiary[500],
              },
            }}
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
                to="/"
                onClick={() => {
                  setMenuBars(false);
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
                to="/movies"
                onClick={() => {
                  setMenuBars(false);
                }}
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
                to="/news/all"
                onClick={() => {
                  setMenuBars(false);
                }}
              >
                News
              </NavLink>
            </li>
            {user && user.role === "admin" ? (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  to="/admin"
                  onClick={() => {
                    setMenuBars(false);
                  }}
                >
                  Admin
                </NavLink>
              </li>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default Nav;
