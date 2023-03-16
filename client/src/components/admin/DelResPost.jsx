import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "../../auxcomponents/input/Input";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import { deletePostAdmin, restrictPostAdmin } from "../../api";

const DelResPost = () => {
  const [formData, setFormData] = useState({ postid: "" });
  const [formError, setFormError] = useState(false);
  const [formSucc, setFormSucc] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(false);
    setFormSucc(false);
    if (isDelete)
      deletePostAdmin(formData.postid)
        .then((res) => {
          setFormSucc(res.data.message);
        })
        .catch((e) => {
          setFormError(e.response.data.message);
        });
    else
      restrictPostAdmin(formData)
        .then((res) => {
          setFormSucc(res.data.message);
        })
        .catch((e) => {
          setFormError(e.response.data.message);
        });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    setFormError(false);
    setFormSucc(false);
    setFormData({ postid: "" });
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
            selected={isDelete}
            onChange={() => {
              setIsDelete(!isDelete);
            }}
          >
            Toggle to {isDelete === false ? "delete" : "restrict"}
          </ToggleButton>
        </Grid>
        <Grid item xs={12}>
          <Input
            name="postid"
            label="Postid"
            handleChange={handleChange}
            type="text"
            required={true}
            value={formData.postid}
            helperText={`Enter the postid of the post you want to ${
              isDelete ? "delete" : "restrict"
            }`}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isDelete ? "Delete post" : "Restrict post"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DelResPost;
