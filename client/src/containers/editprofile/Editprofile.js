import React, { useState, useEffect } from "react";
import "./editprofile.css";
import { useSelector } from "react-redux";
import { getSimpleProfile } from "../../api/index";
import { EditInfo } from "../../components";
import {
  StyledEngineProvider,
  Paper,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const Editprofile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    async function getProfileData() {
      const res = await getSimpleProfile();
      const { profileUser } = res.data;
      setProfile(profileUser);
    }

    getProfileData();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2} component="div" className="editprofile-container">
        <Typography component="h2" variant="h3" className="Container-title">
          Edit your profile{" "}
        </Typography>
        <Divider flexItem />
        <Box component="div" className="editprofile-info">
          {profile && (
            <EditInfo
              currentName={profile.fullname}
              username={user.username}
              initialState={{
                firstName: profile.firstName,
                lastName: profile.lastName,
                newPass: "",
                oldPass: "",
                location: profile.location,
                dateofbirth: profile.dateofbirth,
                gender: profile.gender,
                bio: profile.bio,
              }}
            />
          )}
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
};

export default Editprofile;
