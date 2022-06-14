import React, { useEffect, useState } from "react";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProfileAvatar,
  ProfileWatchlist,
  ProfileBio,
  ProfileFav,
} from "../../components";
import { getProfile, getFavouritesProfile } from "../../api";
import { useSelector } from "react-redux";
import {
  Paper,
  Grid,
  Box,
  Typography,
  StyledEngineProvider,
} from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [myProfile, setMyProfile] = useState(false);
  const [joined, setJoined] = useState(null);
  const [favorites, setFavourites] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await getProfile(username);
      const { profileUser, joined } = res.data;
      if (res.data.message === "Profile does not exist") navigate("/error");
      else {
        setProfile(profileUser);
        setJoined(joined);
        const {
          watching,
          dropped,
          onhold,
          plantowatch,
          totalStatus,
          completed,
        } = res.data;
        setStatus({
          completed,
          watching,
          onhold,
          plantowatch,
          dropped,
          totalStatus,
        });
      }
    }
    async function getFavData() {
      const res = await getFavouritesProfile(username);
      const { favourites } = res.data;
      setFavourites(favourites);
    }

    getData();
    getFavData();
  }, [username, navigate]);

  useEffect(() => {
    if (user && profile && profile.username === user.username)
      setMyProfile(true);
    else setMyProfile(false);
  }, [user, profile]);
  if (profile)
    return (
      <StyledEngineProvider injectFirst>
        <Paper elevation={2}>
          <Typography component="h2" variant="h3" className="Container-title">
            {myProfile ? "My" : profile.username + "'s"} profile
          </Typography>

          <Box
            className="container-profile"
            sx={{ flexGrow: 1 }}
            component="div"
          >
            <Grid container spacing={1}>
              {myProfile ? (
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Link className="profile-editprofile" to="/profile/edit/info">
                    <SettingsIcon
                      fontSize="small"
                      sx={{ verticalAlign: "sub" }}
                    />
                    <span>Edit info</span>
                  </Link>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item className="profile-avatar-item" xs={12} md={6}>
                <ProfileAvatar profile={profile} joined={joined} />
              </Grid>
              <Grid item className="" xs={12} md={6}>
                {profile && <ProfileBio bio={profile.bio} />}
                <ProfileWatchlist status={status} />
              </Grid>
              <Grid item className="" xs={12} md={12}>
                <ProfileFav movies={favorites} myProfile={myProfile} />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </StyledEngineProvider>
    );
  return <div>That profile does not exist!</div>;
};

export default Profile;
