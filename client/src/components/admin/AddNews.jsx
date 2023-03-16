import React, { useState } from "react";
import "./addnews.css";
import DraftTextArea from "../../auxcomponents/input/DraftTextarea";
import { Box, Typography, Grid, Button } from "@mui/material";
import Input from "../../auxcomponents/input/Input";
import { useNavigate } from "react-router-dom";
import { addNews } from "../../api";

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: null,
    movieid: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.title !== "" &&
      formData.content.blocks[0].text.length >= 1 &&
      formData.movieid !== ""
    ) {
      setFormError(null);

      addNews(formData)
        .then((res) => {
          const newsid = res.data;
          navigate(`/news/movie/${formData.movieid}/${newsid}`);
        })
        .catch((e) => setFormError(e));
    } else setFormError("You need to fill all both fields!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setField = (newValue) => {
    setFormData({ ...formData, content: newValue });
  };

  const clearChanges = () => {
    navigate(`/admin`);
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, p: 2 }}
        component="form"
        onSubmit={handleSubmit}
        className="newsadd-form"
      >
        <Grid container spacing={2} className="newsadd-form-grid">
          {formError ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="red">
                {formError}
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12} className="newsadd-textarea">
            <Input
              name="movieid"
              label="Movieid the news is about"
              handleChange={handleChange}
              type="text"
              required={true}
              value={formData.movieid}
              maxLength={50}
            />
          </Grid>

          <Grid item xs={12} className="newsadd-textarea">
            <Input
              name="title"
              label="Choose a title"
              handleChange={handleChange}
              type="text"
              required={true}
              value={formData.title}
              maxLength={70}
              helperText={`${formData.title.length}/70 characters`}
            />
          </Grid>

          <Grid item xs={12} className="newsadd-textarea">
            <DraftTextArea
              setField={setField}
              placeholder={"Content of news"}
              textMaxLength={5000}
              link={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-newsadd"
            >
              Post
            </Button>
            <Button onClick={clearChanges} variant="text">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddNews;
