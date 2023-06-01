import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HeaderNotifications from "@/components/global/HeaderNotifications";
import HeaderProfile from "@/components/global/HeaderProfile";

const Header = () => {
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const user = { username: "adrianus", fullname: "gabi andr" };
  const isLoggedIn = true;
  return (
    <Box
      display="flex"
      width="100%"
      height={{ sm: "2.5rem", md: "3rem", lg: "3.5rem" }}
      bgcolor={theme.palette.secondary[100]}
      sx={{ transitionTimingFunction: "ease-in", transition: "0.5s" }}
    >
      <Box
        flexBasis="50%"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <NavLink to="/home">
          {isAboveMd ? (
            <Typography
              variant="h1"
              component="h1"
              fontSize={{ md: 36, lg: 40 }}
              sx={{
                background: `linear-gradient(170deg,${theme.palette.secondary[500]} -0.1%,${theme.palette.tertiary[400]} 96.7%)`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              MyMovieStand
            </Typography>
          ) : (
            <Typography
              variant="h1"
              component="h1"
              fontSize={{ xs: 28, sm: 32 }}
              sx={{
                background: `linear-gradient(170deg,${theme.palette.secondary[500]} -0.1%,${theme.palette.tertiary[400]} 96.7%)`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              MMS
            </Typography>
          )}
        </NavLink>
      </Box>
      <Box
        flexBasis="50%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {user && isLoggedIn ? (
          <>
            <Box>
              <NavLink to={`/watchlist/${user.username}`}>
                <Tooltip title="My Watchlist">
                  <IconButton
                    sx={{
                      color: theme.palette.tertiary[500],
                      "&:hover": { bgcolor: theme.palette.tertiary[100] },
                    }}
                  >
                    <FormatListBulletedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </NavLink>
            </Box>

            <Divider orientation="vertical" flexItem />

            <HeaderNotifications theme={theme} />

            <Divider orientation="vertical" flexItem />

            <HeaderProfile user={user} theme={theme} />
          </>
        ) : (
          <>
            <NavLink state={{ from: location }} to="/login">
              {({ isActive }) => (
                <Button
                  variant="text"
                  sx={{
                    fontWeight: 900,
                    marginRight: "0.5rem",
                    borderRadius: "10px",
                    padding: {
                      xs: "1px 2px 1px 2px",
                      sm: "2px 3px 2px 3px",
                      md: "3px 6px 3px 6px",
                      lg: "5px 7px 5px 7px",
                    },
                    backgroundColor: theme.palette.tertiary[400],
                    color: isActive
                      ? theme.palette.grey[100]
                      : theme.palette.secondary[400],
                    "&:hover": { backgroundColor: theme.palette.tertiary[200] },
                  }}
                >
                  Login
                </Button>
              )}
            </NavLink>
            <NavLink state={{ from: location }} to="/signup">
              {({ isActive }) => (
                <Button
                  variant="text"
                  sx={{
                    fontWeight: 900,
                    marginRight: "0.5rem",
                    borderRadius: "10px",
                    padding: {
                      xs: "1px 2px 1px 2px",
                      sm: "2px 3px 2px 3px",
                      md: "3px 6px 3px 6px",
                      lg: "5px 7px 5px 7px",
                    },
                    backgroundColor: theme.palette.tertiary[400],
                    color: isActive
                      ? theme.palette.grey[100]
                      : theme.palette.secondary[400],
                    "&:hover": { backgroundColor: theme.palette.tertiary[200] },
                  }}
                >
                  Sign Up
                </Button>
              )}
            </NavLink>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
