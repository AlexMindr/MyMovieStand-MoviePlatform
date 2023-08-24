import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FlexBox from "@/shared/FlexBox";

type Props = {
  status: string;
  adult: boolean;
  uscertification: string;
  language: string;
};

const LangStatusRating = ({
  status,
  adult,
  uscertification,
  language,
}: Props) => {
  return (
    <FlexBox
      justifyContent="left"
      width="100%"
      py="0.5rem"
      sx={{
        "&>span": {
          fontSize: { sm: "0.85rem", md: "0.8rem", lg: "0.9rem" },
          fontWeight: "bold",
          textAlign: "center",
        },
        "&>hr": {
          mx: "0.5rem",
        },
      }}
    >
      <Typography variant="subtitle2" component="span">
        Movie
      </Typography>
      <Divider orientation="vertical" flexItem></Divider>
      <Typography variant="subtitle2" component="span">
        {adult ? "Adult" : uscertification}
      </Typography>
      <Divider orientation="vertical" flexItem></Divider>
      <Typography variant="subtitle2" component="span">
        Status: {status}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="subtitle2" component="span">
        Language: {language.toUpperCase()}
      </Typography>
    </FlexBox>
  );
};

export default LangStatusRating;
