import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HeaderNotifications from "@/components/header/HeaderNotifications";
import HeaderProfile from "@/components/header/HeaderProfile";
import SignButton from "@/components/header/SignButton";

const Header = () => {
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  //TO BE REMOVED
  //const user: { username: string } | undefined = undefined;
  // const user = { username: "adrianus", fullname: "gabi andr" };
  // const isLoggedIn = true;
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
        <NavLink to="/">
          <Typography
            variant="h1"
            component="h1"
            fontSize={{ xs: 28, sm: 32, md: 36, lg: 40 }}
            sx={{
              background: `linear-gradient(170deg,${theme.palette.secondary[500]} -0.1%,${theme.palette.tertiary[400]} 96.7%)`,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {isAboveMd ? " MyMovieStand" : "MMS"}
          </Typography>
        </NavLink>
      </Box>
      <Box
        flexBasis="50%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        {/* {user != undefined ? (
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

            <HeaderNotifications />

            <Divider orientation="vertical" flexItem />

            <HeaderProfile user={user} />
          </>
        ) :( */}

        <>
          <NavLink state={{ from: location }} to="/login">
            {({ isActive }) => (
              <SignButton isActive={isActive}>Login</SignButton>
            )}
          </NavLink>
          <NavLink state={{ from: location }} to="/signup">
            {({ isActive }) => (
              <SignButton isActive={isActive}>Sign up</SignButton>
            )}
          </NavLink>
        </>
        {/*  )} */}
      </Box>
    </Box>
  );
};

export default Header;
