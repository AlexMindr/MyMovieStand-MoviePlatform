import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  maxLength=100,
  minLength=3,
  disabled,
  value,
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  required,
  select,
  helperText,
  error,
  isPassword,
  children,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        disabled={disabled}
        error={error}
        value={value}
        name={name}
        onChange={handleChange}
        variant="outlined"
        required={required}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        select={select}
        helperText={helperText}
        SelectProps={{
          native: true,
        }}
        InputProps={
          isPassword === true
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        inputProps={{ maxLength,minLength}}
      >
        {children}
      </TextField>
    </Grid>
  );
};
export default Input;
