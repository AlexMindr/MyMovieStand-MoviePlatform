import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import { Theme } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (name.split(" ")[0][0] && name.split(" ")[1][0])
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

type Props = {
  user: { fullname: string; username: string };
  theme: Theme;
};

const HeaderProfile = ({ user, theme }: Props) => {
  return (
    <>
      <Box
        position="relative"
        marginLeft={1}
        marginRight={1}
        sx={{ "&:hover #dropdown-profile": { display: "block" } }}
      >
        <Button
          sx={{
            textTransform: "none",
            color: theme.palette.tertiary[500],
            fontWeight: 600,
            fontSize: "0.9rem",
            "&:hover": { bgcolor: theme.palette.tertiary[100] },
          }}
        >
          {user.username.length > 10
            ? user.username.substring(0, 10) + "..."
            : user.username}
          <ArrowDropDownIcon />
        </Button>
        <Box
          id="dropdown-profile"
          display="none"
          position="absolute"
          minWidth="100px"
          boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.2)"
          zIndex="1000"
          fontSize="0.8rem"
          bgcolor={theme.palette.secondary[100]}
          sx={{
            "& a,button": {
              color: theme.palette.tertiary[400],
              p: 1,
              textDecoration: "none",
              display: "block",
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
              fontWeight: 500,
              cursor: "pointer",
            },
            "&>a:hover": { color: theme.palette.primary[700] },
            "&>button:hover": { color: theme.palette.primary[800] },
          }}
        >
          <Link to={`/profile/${user.username}`}>Profile</Link>
          <Link to={`/profile/${user.username}/reviews`}>My Reviews</Link>
          <Link className="hover" to={`/profile/${user.username}/posts`}>
            My Posts
          </Link>
          <Link to={`/profile/edit/info`}>
            <SettingsIcon
              fontSize="small"
              sx={{ verticalAlign: "bottom", marginRight: 1 }}
            />
            Settings
          </Link>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            //onClick={handleLogout}
          >
            <LogoutIcon
              fontSize="small"
              sx={{ verticalAlign: "bottom", marginRight: 1 }}
            />
            Logout
          </button>
        </Box>
      </Box>
      <Link to={`/profile/${user.username}`}>
        <Avatar
          {...stringAvatar(user.fullname)}
          sx={{ width: 34, height: 34, marginRight: 1 }}
        />
      </Link>
    </>
  );
};

export default HeaderProfile;
