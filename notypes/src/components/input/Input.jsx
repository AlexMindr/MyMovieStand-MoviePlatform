import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({ value,name, handleChange, label, autoFocus, type, handleShowPassword,required,select,helperText,children }) => {
   return (
      <Grid item xs={12} >
         <TextField
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
            InputProps={name === 'password' ? {
               endAdornment: (
                  <InputAdornment position="end">
                     <IconButton onClick={handleShowPassword}>
                        {type === 'password' ? <Visibility /> : <VisibilityOff />}
                     </IconButton>
                  </InputAdornment>
               ),
            } : null}
         >
         {children}
         </TextField>
      </Grid>
   )
}
export default Input;