import { getMovies, getMovie } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieType } from "@/shared/types";
import Loading from "@/components/global/Loading";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material";
import ContainerTitle from "@/shared/ContainerTitle";
//import Breadcrumbs from "@mui/material/Breadcrumbs";
//import Link as MuiLink from "@mui/material/Link";
//import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useSetTitle from "@/shared/hooks/setTitle";
import MovieCard from "@/components/movies/MovieCard";
import GeneralError from "@/components/error/GeneralError";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { useParams, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
const pageTitle = "Browse Movies";

const Movies = () => {
  const theme = useTheme();
  useSetTitle(pageTitle);
  const [pageParams, setPageParams] = useSearchParams({ page: "1" });
  const page = parseInt(pageParams?.get("page") || "1");
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["movies", { page }],
      queryFn: async () => {
        const { data } = await getMovies(page);
        return data as { movies: MovieType[]; totalPages: number };
      },
      keepPreviousData: true,
      staleTime: 60000,
    });
  const pageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPageParams({ page: value.toString() });
  };

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <GeneralError />;
  else
    return (
      <>
        {/* <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link underline="hover" color="tertiary" href="/">
          MMS
        </Link>
        <Link
          underline="hover"
          color={theme.palette.tertiary[700]}
          href="/movies"
          aria-current="page"
        >
          Movies
        </Link>
      </Breadcrumbs> */}
        {/* Page title */}
        <ContainerTitle variant="h2">{pageTitle}</ContainerTitle>
        <Box
        //display="flex"
        >
          {/* Movies grid */}
          <Box
            component="ul"
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
            }}
            rowGap="1rem"
            columnGap="10px"
            // flexGrow="1"
            // justifyContent="center"
            // alignItems="center"
            sx={
              {
                //paddingInlineStart: 0,
                //marginBlockEnd: 0,
                //marginBlockStart: 0,
              }
            }
          >
            {data.movies.length > 1 ? (
              data.movies.map((movie) => (
                <MovieCard key={movie.movieid} movie={movie} />
              ))
            ) : (
              <Typography
                variant="h3"
                fontStyle="oblique"
                color={theme.palette.grey[200]}
              >
                There are no movies matching your search criteria!
              </Typography>
            )}
          </Box>
          {/* Movies pagination */}
          {data.movies != null && data.movies.length >= 1 ? (
            <FlexBoxCenter
              p="0.5rem"
              minWidth="100%"
              //className="container-pagination"
            >
              <Pagination
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
      </>
    );
};

export default Movies;
