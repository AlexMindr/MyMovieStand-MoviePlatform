import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "../../auxcomponents/input/Input";
import Button from "@mui/material/Button";
import { deleteUserAdmin } from "../../api";

const DeleteUser = () => {
  const [formData, setFormData] = useState({ username: "" });
  const [formError, setFormError] = useState(false);
  const [formSucc, setFormSucc] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(false);
    setFormSucc(false);
    deleteUserAdmin(formData.username)
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
    setFormData({ user: "" });
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
          <Input
            name="username"
            label="Username"
            handleChange={handleChange}
            type="text"
            required={true}
            value={formData.username}
            helperText={"Username of the user you want to delete"}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Delete user
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

export default DeleteUser;
