import FlexBox from "@/shared/FlexBox";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import formatDate from "@/shared/functions/formatDate";

type Props = {
  duration: string;
  release_date: Date;
};

const AiringDetails = ({ duration, release_date }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <FlexBox
      justifyContent="flex-start"
      width="100%"
      py="0.5rem"
      sx={{
        "&>span": {
          fontSize: { sm: "0.9rem", md: "0.85rem", lg: "0.95rem" },
          fontWeight: 700,
          textAlign: "center",
        },
        "&>hr": {
          mx: "0.5rem",
        },
      }}
    >
      <Typography variant="subtitle2" component="span">
        Runtime:{" "}
        {duration
          ? `${Math.round(parseInt(duration) / 60)}h  ${
              parseInt(duration) % 60
            }min`
          : "N/A"}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="subtitle2" component="span">
        Released:{" "}
        {release_date ? formatDate(release_date, options, "en-GB") : "TBA"}
      </Typography>
    </FlexBox>
  );
};

export default AiringDetails;
