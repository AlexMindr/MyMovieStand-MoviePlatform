import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import FlexBox from "@/shared/FlexBox";
import numberFormat from "@/shared/functions/numberFormat";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import imdb_icon from "@/assets/imdb_icon.webp";
import tmdb_icon from "@/assets/tmdb_icon.png";
import website_icon from "@/assets/website_icon.png";

type Props = {
  rating: number;
  popularity: number;
  homepage: string;
  tmdb_id: number;
  imdb_id: string;
};

const RatingBox = ({
  rating,
  popularity,
  homepage,
  tmdb_id,
  imdb_id,
}: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBox
      justifyContent="space-around"
      width="100%"
      bgcolor={palette.secondary[100]}
    >
      <Typography variant="subtitle1" component="span">
        <StarOutlineIcon fontSize="medium" sx={{ verticalAlign: "sub" }} />
        {rating ? rating : "N/A"}
      </Typography>
      <Typography variant="subtitle1" component="span">
        <PeopleAltRoundedIcon
          fontSize="medium"
          sx={{ verticalAlign: "text-bottom" }}
        />
        {popularity ? numberFormat(popularity) : "N/A"}
      </Typography>
      <Box
        pt="0.5rem"
        component="span"
        sx={{
          "&>a>img": {
            height: "25px",
            bgColor: "transparent",
          },
        }}
      >
        <a href={`https://www.imdb.com/title/${imdb_id}`}>
          <img src={imdb_icon} alt={"imdb"} />
        </a>
        <a href={`https://www.themoviedb.org/movie/${tmdb_id}`}>
          <img src={tmdb_icon} alt={"imdb"} />
        </a>
        <a href={homepage}>
          <img src={website_icon} alt={"imdb"} />
        </a>
      </Box>
    </FlexBox>
  );
};

export default RatingBox;
