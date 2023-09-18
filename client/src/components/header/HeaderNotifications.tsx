import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useTheme } from "@mui/material";

const HeaderNotifications = () => {
  const theme = useTheme();
  return (
    <Box
      position="relative"
      marginLeft={1}
      marginRight={1}
      sx={{ "&:hover #dropdown-notifications": { display: "block" } }}
    >
      <IconButton
        sx={{
          color: theme.palette.secondary[500],
          "&:hover": { bgcolor: theme.palette.tertiary[100] },
        }}
        //onClick={refreshNotif}
      >
        <CircleNotificationsIcon fontSize="large" />
      </IconButton>
      <Box
        component="span"
        position="absolute"
        borderRadius={5}
        bgcolor="red"
        color="white"
        fontWeight={500}
        fontSize="0.8rem"
        minWidth="15px"
        lineHeight="1"
        p="3px 3px"
        height="20px"
        zIndex={1}
        top="0"
        right="0"
        sx={{
          transition: `transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
          transform: "scale(1) translate(0%,20%)",
          transformOrigin: "100% 0%",
        }}
      >
        10
        {/* {notifications.length > 0 &&
              getUnreadNotif(notifications).length > 0 ? (
                <span className="notification-length-unread">
                  {getUnreadNotif(notifications).length}
                </span>
              ) : (
                <></>
              )} */}
      </Box>

      <Box
        className="dropdown-content-notif"
        id="dropdown-notifications"
        display="none"
        position="absolute"
        minWidth="200px"
        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.2)"
        zIndex="1000"
        fontSize="0.8rem"
        bgcolor={theme.palette.secondary[100]}
        left="-75px"
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
        {/* {getUnreadNotif(notifications)
                  .slice(0, 5)
                  .map((notif) => (
                    <SimpleNotif
                      key={notif.notificationid}
                      notification={notif}
                    />
                  ))} */}
        <Link to={`/notifications`}>See All Notifications</Link>
      </Box>
    </Box>
  );
};

export default HeaderNotifications;
