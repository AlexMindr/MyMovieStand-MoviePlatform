import { useTheme } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { NavLink } from "react-router-dom";

interface Props extends BoxProps {
  setMenuBars: React.Dispatch<React.SetStateAction<boolean>>;
  menuBars: boolean;
  activeStyle: string;
  user?: { role: string };
  // divStyle?: {
  //   width?: string;
  //   alignItems?: string;
  //   justifyContent?: string;
  //   paddingBottom?: string;
  //   backgroundImage?: string;
  //   minWidth?: string;
  // };
  ulFlexDirection?: string;
  ulTextAlign?: string;
}

const Nav = ({
  menuBars,
  setMenuBars,
  activeStyle,
  user,
  ulFlexDirection = "row",
  ulTextAlign = "center",
  ...sx
}: Props) => {
  const theme = useTheme();
  return (
    <Box display={menuBars ? "flex" : "none"} {...sx}>
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
          fontSize={{ xs: "1.5rem", md: "1.1rem" }}
          boxSizing="border-box"
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
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
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
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/movies"
              reloadDocument
              onClick={() => {
                setMenuBars(false);
              }}
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
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
  );
};

export default Nav;
