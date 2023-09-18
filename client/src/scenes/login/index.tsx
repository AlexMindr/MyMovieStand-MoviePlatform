import LoginForm from "@/components/login/LoginForm";
import ContainerTitle from "@/shared/ContainerTitle";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import useSetTitle from "@/shared/hooks/setTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const PageTitle = "Login";

const Login = () => {
  useSetTitle(PageTitle);
  return (
    <>
      {/* Page title */}
      <ContainerTitle variant="h2">
        {PageTitle} into your account
      </ContainerTitle>
      <FlexBoxCenter flexDirection={"column"} minHeight="50svh">
        <Typography
          variant="body1"
          my="0.5rem"
          textAlign="center"
          px="2rem"
          //   sx={{
          //     textIndent: "2rem",
          //   }}
        >
          *If you wish to create a personal watchlist, rate movies, write
          reviews and discuss on our forum, you will need to login to your
          personal account. If you don't have an account you can sign up for
          free by clicking
          <Link to="/signup" style={{ fontWeight: "bold" }}>
            &nbsp; here
          </Link>
          .
        </Typography>
        <LoginForm />
      </FlexBoxCenter>
    </>
  );
};

export default Login;
