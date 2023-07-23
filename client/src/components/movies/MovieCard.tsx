import { MovieType } from "@/shared/types";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material";
import MovieCardTrailer from "./CardTrailer";
import MovieCardGenres from "./CardGenres";
import MovieCardBottom from "./CardBottom";
import MovieCardDetails from "./CardDetails";

type Props = {
  movie: MovieType;
};

const MovieCard = ({ movie }: Props) => {
  const {
    adult,
    uscertification,
    duration,
    Genres,
    overview,
    poster_path,
    release_date,
    title,
    movieid,
    trailer,
    rating,
    popularity,
  } = movie;
  const theme = useTheme();
  //TO BE REMOVED
  const user = { username: "adrianus", fullname: "gabi andr" };
  const wlData: { rating: number; status: string } = {
    rating: 1,
    status: "ON-Hold",
  };
  return (
    <Card
      component="li"
      sx={{
        bgcolor: theme.palette.watchlistBg.main,
        display: "block",
        border: "0.1rem solid",
        maxWidth: "320px",
        minWidth: "260px",
        position: "relative",
        borderColor: theme.palette.grey[100],
        height: "100%",
        // minHeight: "100%",
        listStyleType: "none",
        textDecoration: "none",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        height="2.75rem"
        minHeight="2.75rem"
        fontSize="1.2rem"
        sx={{
          "& a": {
            textAlign: "center",
            width: "90%",
            textWrap: "balance",
          },
        }}
      >
        <Link to={`/movies/${movieid}`}>
          {title.length > 40 ? title.substring(0, 40) + "..." : title}
        </Link>
      </Typography>

      <Divider flexItem>
        {/* Trailer button pv */}
        <MovieCardTrailer trailer={trailer} title={title} />
      </Divider>
      {/* Movie Details */}
      <MovieCardDetails
        adult={adult}
        release_date={release_date}
        duration={duration}
        uscertification={uscertification}
      />
      {/* Movie Genres */}
      <MovieCardGenres Genres={Genres} />
      {/* Movie Poster and Synopsis */}
      <CardContent
        sx={{
          display: "flex",
          maxWidth: "100%",
          border: `1px solid ${theme.palette.primary[400]}`,
          p: "1px",
          minHeight: "12rem",
        }}
      >
        <CardMedia
          component="img"
          loading="lazy"
          image={`https://image.tmdb.org/t/p/original${poster_path}`}
          // placeholder={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          title={title}
          sx={{
            height: "12rem",
            flexBasis: "45%",
          }}
        />
        <Typography
          variant="body2"
          color={theme.palette.grey[600]}
          component="p"
          flexBasis="55%"
          overflow="hidden"
          height="12rem"
          textAlign="start"
          sx={{
            p: "0 0.2rem 0 0.4rem",
            marginRight: "8px",
            hyphens: "auto",
            hyphenateLimitChars: "5 3 3",
            textAlignLast: "left",
            // textIndent: "10%",
            "&:hover": {
              // paddingRight: "3px",
              overflow: "visible",
              overflowX: "hidden",
              overflowY: "scroll",
            },
          }}
        >
          {overview ? overview : <em>Synopsis unavailable</em>}
        </Typography>
      </CardContent>
      {/* Card bottom - Watchlist status, popularity and score */}
      <MovieCardBottom
        wlData={wlData}
        user={user}
        popularity={popularity}
        rating={rating}
        title={title}
      />
    </Card>
  );
};

export default MovieCard;
