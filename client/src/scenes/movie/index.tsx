import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { MovieType } from "@/shared/types";
import { getMovie } from "@/api";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import FlexBox from "@/shared/FlexBox";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import colorRGBA from "@/shared/functions/colorRGBA";
import useSetTitle from "@/shared/hooks/setTitle";
import imageUnknown from "@/assets/unknown.jpg";
import LangStatusRating from "@/scenes/movie/LangStatusRating";
import GenresBox from "@/scenes/movie/GenresBox";
import AiringDetails from "@/scenes/movie/AiringDetails";
import RatingBox from "@/scenes/movie/RatingBox";
import SynopsisTrailer from "@/scenes/movie/SynopsisTrailer";
import WatchListBox from "@/scenes/movie/WatchListBox";
import GalleryBudgetKw from "@/scenes/movie/GalleryFinancialKw";

const Movie = () => {
  const { id } = useParams();
  const { palette } = useTheme();
  const {
    isLoading,
    isError,
    status: queryStatus,
    data,
    isFetching,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await getMovie(id ?? "");
      return data as MovieType;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 500,
  });
  useSetTitle(data?.title ?? "Not Found");

  if (isLoading || isFetching) return <Loading minHeight="50svh" />;
  if (isError)
    return (
      <GeneralError
        message={
          queryStatus === "error"
            ? "Movie does not exist!"
            : "Something went wrong"
        }
      />
    );
  const {
    movieid,
    adult,
    backdrop_path,
    budget,
    homepage,
    imdb_id,
    tmdb_id,
    language,
    original_title,
    overview,
    poster_path,
    release_date,
    revenue,
    duration,
    status,
    title,
    trailer,
    keywords,
    popularity,
    uscertification,
    rating,
    Genres,
  } = data;
  return (
    // Movie Container with bgimage
    <Box
      position="relative"
      width="100%"
      sx={{
        isolation: "isolate",
        "&::before": {
          content: "''",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "100% auto",
          backgroundPosition: "center center",
          backgroundBlendMode: "screen",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
          position: "absolute",
          zIndex: "-1",
          width: "100%",
          height: "100%",
          opacity: 0.35,
        },
      }}
    >
      {/* Page title */}
      <Box
        py="0.5rem"
        pl="1rem"
        bgcolor={palette.grey[100]}
        borderBottom={`5px solid ${palette.secondary[400]}`}
        sx={{ opacity: 0.75 }}
      >
        <Typography variant="h2" color={palette.tertiary[500]}>
          {original_title}
        </Typography>
        <Typography variant="h3" fontStyle="italic" color={palette.grey[500]}>
          {title}
        </Typography>
      </Box>
      {/* Movie Poster, Essential Info, Trailer & watchlist logic */}
      <Box
        display={{ xs: "block", md: "flex" }}
        bgcolor={colorRGBA(palette.watchlistBg.main, "0.95")}
      >
        {/* Poster */}
        <FlexBox
          justifyContent={{ xs: "center", md: "flex-end" }}
          flexBasis={{ md: "35%", lg: "25%" }}
          p={{ xs: "0.75rem", md: "0.75rem 0 0.75rem 0.75rem" }}
        >
          <img
            style={{
              objectFit: "contain",
              width: "clamp(200px,100%,350px)",
            }}
            alt={title}
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        </FlexBox>
        {/* Essential Info and Trailer */}
        <FlexBoxCenter
          flexBasis={{ md: "65%", lg: "75%" }}
          flexDirection="column"
          p="0.5rem"
        >
          {/* Type,Lang,Status & Rating */}
          <LangStatusRating
            status={status}
            language={language}
            uscertification={uscertification}
            adult={adult}
          />
          {/* Genres */}
          <GenresBox Genres={Genres} />
          {/* Airing details - duration & release_date */}
          <AiringDetails duration={duration} release_date={release_date} />
          {/* Popularity, Rating, Link to external sites */}
          <RatingBox
            rating={rating}
            popularity={popularity}
            homepage={homepage}
            tmdb_id={tmdb_id}
            imdb_id={imdb_id}
          />
          {/* Synopsis & Trailer */}
          <SynopsisTrailer
            trailer={trailer}
            overview={overview}
            title={title}
          />
          {/* TODO Logic for user watchlist */}
          {/* Add to watchlist/edit */}
          <WatchListBox />
        </FlexBoxCenter>
      </Box>
      {/* Gallery with other images & other info */}
      {/* TODO fixes for very small screens */}
      <GalleryBudgetKw
        title={title}
        tmdb_id={tmdb_id}
        budget={budget}
        revenue={revenue}
        keywords={keywords}
      />
    </Box>
  );
};

export default Movie;
