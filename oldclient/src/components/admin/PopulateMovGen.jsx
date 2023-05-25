import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "../../auxcomponents/input/Input";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import { populateGenres, populateMovies } from "../../api";

const PopulateMovGen = () => {
  //const [formData, setFormData] = useState({reviewid:''})
  const [formError, setFormError] = useState(false);
  const [formSucc, setFormSucc] = useState(false);
  const [isMovie, setIsMovie] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(false);
    setFormSucc(false);
    if (isMovie)
      populateMovies()
        .then((res) => {
          setFormSucc(res.data.message);
        })
        .catch((e) => {
          setFormError(e.response.data.message);
        });
    else
      populateGenres()
        .then((res) => {
          setFormSucc(res.data.message);
        })
        .catch((e) => {
          setFormError(e.response.data.message);
        });
  };

  return (
    <Box sx={{ flexGrow: 1 }} component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} className="login-form">
        {formError ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="red">
              {formError}
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
        {formSucc ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="blue">
              {formSucc}
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          <ToggleButton
            sx={{ color: "red" }}
            color="success"
            value="check"
            selected={isMovie}
            onChange={() => {
              setIsMovie(!isMovie);
            }}
          >
            Toggle to {isMovie === false ? "Movies" : "Genres"}
          </ToggleButton>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isMovie ? "Populate movies" : "Populate genres"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PopulateMovGen;
