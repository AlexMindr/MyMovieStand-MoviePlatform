import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MovieType } from "@/shared/types";
import { getMovie } from "@/api";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import useSetTitle from "@/shared/hooks/setTitle";
import GalleryBudgetKw from "@/scenes/movie/GalleryFinancialKw";
import GalleryProduction from "./GalleryProduction";
import MovieInfoPoster from "./MovieInfoPoster";
import MovieReviews from "./MovieReviews";

/* TODO fixes for very small screens */

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
  const { backdrop_path, original_title, title, movieid } = data;
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
          backgroundSize: "auto 100%",
          backgroundPosition: "center center",
          backgroundBlendMode: "screen",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
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
      <MovieInfoPoster {...data} />
      {/* Gallery with other images & other info */}
      <GalleryBudgetKw {...data} />
      {/* Gallery with production team (cast and crew) */}
      <GalleryProduction {...data} />
      {/* Reviews */}
      <MovieReviews movieid={movieid} />
      {/* Posts */}
      {/* Ai Recommendations */}
    </Box>
  );
};

export default Movie;
