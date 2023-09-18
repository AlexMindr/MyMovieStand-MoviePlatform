import FlexBox from "@/shared/FlexBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

//initial form values
const initialValues = {
  email: "",
  password: "",
};

//value validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

type FormValues = typeof initialValues;

const LoginForm = () => {
  const handleFormSubmit = async (values: FormValues) => {
    console.log("Success");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box mt="30px" maxWidth="minmax(100%,350px)">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ my: "1rem" }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mt: "0.5rem", mb: "2rem" }}
        />
        <FlexBox justifyContent="space-evenly">
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
          <Button color="secondary" variant="outlined" type="button">
            Reset password
          </Button>
        </FlexBox>
      </form>
    </Box>
  );
};

export default LoginForm;
