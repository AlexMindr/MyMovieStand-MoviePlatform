import { ChangeEvent, memo, useMemo } from "react";
import { MovieType } from "@/shared/types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import MovieCard from "@/components/movies/MovieCard";
import { SetURLSearchParams } from "react-router-dom";

const MemoizedMovieCard = memo(MovieCard);

type Props = {
  data: { movies: MovieType[]; totalPages: number };
  page: number;
  setPageParams: SetURLSearchParams;
};

const MoviesGrid = ({ data, page, setPageParams }: Props) => {
  const { palette } = useTheme();

  const pageChange = (_e: ChangeEvent<unknown>, value: number) => {
    setPageParams((prev) => {
      prev.set("page", value.toString());
      return prev;
    });
  };

  const memoizedMovies = useMemo(() => {
    return data.movies.map((movie) => (
      <MemoizedMovieCard key={movie.movieid} movie={movie} />
    ));
  }, [data]);

  return (
    <Box pt="1rem" width="100%">
      {/* Movies grid */}
      {data.movies.length >= 1 ? (
        <Box
          component="ul"
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          }}
          rowGap="1rem"
          columnGap="10px"
          sx={{
            listStyleType: "none",
            paddingInlineStart: 0,
            paddingInline: "10px",
            marginBlockEnd: 0,
            marginBlockStart: 0,
            placeItems: "center",
          }}
        >
          {memoizedMovies}
        </Box>
      ) : (
        <FlexBoxCenter minHeight="25dvh">
          <Typography
            variant="h3"
            fontStyle="oblique"
            color={palette.grey[200]}
          >
            There are no movies matching your search criteria!
          </Typography>
        </FlexBoxCenter>
      )}
      {/* Movies pagination */}
      {data.movies != null && data.movies.length >= 1 ? (
        <FlexBoxCenter p="3rem" minWidth="100%">
          <Pagination
            color="primary"
            count={data.totalPages}
            page={page ? page : 1}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            onChange={pageChange}
          />
        </FlexBoxCenter>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default MoviesGrid;
