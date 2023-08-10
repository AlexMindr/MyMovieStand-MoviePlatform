import FlexBoxCenter from "@/shared/FlexBoxCenter";
import Typography from "@mui/material/Typography";

type Props = {
  message?: string;
};

const GeneralError = ({ message }: Props) => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <FlexBoxCenter flexDirection="column" minHeight="20dvh">
      <Typography component="strong" color={"red"} fontSize="1.2em">
        {message ? message : "Something went wrong!"}
      </Typography>
      <Typography component="span" fontSize="1em">
        Please{" "}
        <em
          onClick={refreshPage}
          style={{ color: "blueviolet", cursor: "pointer" }}
        >
          refresh
        </em>{" "}
        or try again later!
      </Typography>
    </FlexBoxCenter>
  );
};

export default GeneralError;
