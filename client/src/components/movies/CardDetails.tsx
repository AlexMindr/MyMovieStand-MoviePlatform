import moment from "moment";
import Typography from "@mui/material/Typography";
import FlexBox from "@/shared/FlexBox";
import { useTheme } from "@mui/material";

type Props = {
  adult: boolean;
  release_date: Date;
  duration: string;
  uscertification: string;
};

const MovieCardDetails = ({
  adult,
  release_date,
  duration,
  uscertification,
}: Props) => {
  const theme = useTheme();

  return (
    <FlexBox
      component="div"
      justifyContent="space-around"
      minHeight="25px"
      m="0.1rem 0.2rem"
      sx={{
        "&>div": {
          fontSize: "0.8rem",
          fontWeight: "500",
          textAlign: "center",
        },
      }}
    >
      <Typography
        color={theme.palette.secondary[400]}
        sx={{
          textShadow: `1px 1px 1px ${theme.palette.secondary[200]}`,
        }}
        variant="subtitle1"
        component="div"
      >
        {adult ? "Adult" : uscertification ? uscertification : "-"}
      </Typography>
      <Typography
        //textAlign={"center"}
        color={theme.palette.tertiary[600]}
        variant="subtitle1"
        component="div"
      >
        {release_date ? moment(release_date).format("MMM YYYY") : "TBA"}
      </Typography>
      {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
      <Typography variant="subtitle1" component="div">
        Movie
      </Typography>
      <Typography variant="subtitle1" component="div">
        {parseInt(duration) > 0 ? (
          <>
            {Math.round(parseInt(duration) / 60)}h {parseInt(duration) % 60}m
          </>
        ) : (
          <>-</>
        )}
      </Typography>
    </FlexBox>
  );
};

export default MovieCardDetails;
