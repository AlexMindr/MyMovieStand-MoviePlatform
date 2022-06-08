import React, { useState } from "react";
import "./postadd.css";
import DraftTextArea from "../../auxcomponents/input/DraftTextarea";
import { Box, Typography, Divider, Grid, Button } from "@mui/material";
import Input from "../../auxcomponents/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { addPost } from "../../api";

const PostAdd = ({ movieid, title }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: null,
    movieid,
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title !== "" && formData.content.blocks[0].text.length >= 1) {
      setFormError(null);

      addPost(formData)
        .then((res) => {
          const postid = res.data;
          navigate(`/movies/${movieid}/posts/post/${postid}`);
        })
        .catch((e) => setFormError(e));
    } else setFormError("You need to fill both fields!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setField = (newValue) => {
    setFormData({ ...formData, content: newValue });
  };

  const clearChanges = () => {
    navigate(`/movies/${movieid}`);
  };

  return (
    <>
      <Typography component="h2" variant="h3" className="Container-title">
        Start a discussion
      </Typography>
      <Box
        sx={{ flexGrow: 1, p: 2 }}
        component="form"
        onSubmit={handleSubmit}
        className="postadd-form"
      >
        <Grid container spacing={2} className="postadd-form-grid">
          <Grid item xs={12}>
            <Typography variant="h5" component="h4">
              Discuss about the movie:
            </Typography>
            <Link to={`/movies/${movieid}`}>
              <Typography variant="h5" component="h5">
                {title}
              </Typography>
            </Link>
            <Divider flexItem sx={{ m: 1 }} />
          </Grid>
          {formError ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="red">
                {formError}
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12} className="postadd-textarea">
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

          <Grid item xs={12} className="postadd-textarea">
            <DraftTextArea
              setField={setField}
              placeholder={"Discuss about the movie here"}
              textMaxLength={1500}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-postadd"
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

export default PostAdd;
