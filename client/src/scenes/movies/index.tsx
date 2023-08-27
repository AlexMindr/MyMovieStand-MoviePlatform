import { getMovies } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieType } from "@/shared/types";
import { useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material";
import ContainerTitle from "@/shared/ContainerTitle";
import useSetTitle from "@/shared/hooks/setTitle";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";
import MovieCard from "@/components/movies/MovieCard";
import SelectGenres from "@/scenes/movies/SelectGenres";
import SearchBox from "@/scenes/movies/SearchBox";
import SelectSort from "@/scenes/movies/SelectSort";
import SelectOrder from "@/scenes/movies/SelectOrder";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import buildQuery, { getParamsObject } from "@/shared/functions/buildQuery";

const PageTitle = "Browse Movies";

const Movies = () => {
  const theme = useTheme();
  useSetTitle(PageTitle);
  const [pageParams, setPageParams] = useSearchParams({
    page: "1",
    title: "",
    sort: "",
    order: "",
    genres: "",
  });

  //get params from url after checks/processing
  const pageParamsObject = getParamsObject(pageParams);

  const [inputSearch, setInputSearch] = useState(pageParamsObject.title);
  const [searchDebounced, setSearchDebounced] = useState(
    pageParamsObject.title
  );
  const [selectSort, setSelectSort] = useState(pageParamsObject.sort);
  const [selectOrder, setSelectOrder] = useState(pageParamsObject.order);
  const [selectGenres, setSelectGenres] = useState<string[]>(
    pageParamsObject.genres
  );
  const [page, setPage] = useState(pageParamsObject.page);

  //build the filter query
  const query = buildQuery(
    inputSearch,
    selectSort,
    selectOrder,
    selectGenres,
    page
  );
  //data fetching
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: [
      "movies",
      { page, searchDebounced, selectGenres, selectOrder, selectSort },
    ],
    queryFn: async () => {
      const { data } = await getMovies(page);
      setPageParams({ ...query });
      return data as { movies: MovieType[]; totalPages: number };
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const pageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {/* Page title */}
      <ContainerTitle variant="h2">{PageTitle}</ContainerTitle>
      <Box component="div">
        {/* Search & Filter  */}
        <Box
          width="100%"
          display={{ xs: "block", lg: "flex" }}
          marginTop={"1rem"}
          marginBottom={"0.25rem"}
        >
          {/* Search box for filtering*/}
          <SearchBox
            inputSearch={inputSearch}
            setInputSearch={setInputSearch}
            setSearchDebounced={setSearchDebounced}
            setPage={setPage}
          />
          {/* Filter by genre/order/sort */}
          <FlexBox
            flexBasis={{ lg: "50%" }}
            justifyContent="flex-end"
            marginLeft="auto"
          >
            {/* Sort */}
            <SelectSort
              selectSort={selectSort}
              setSelectSort={setSelectSort}
              setPage={setPage}
            />
            {/* Order */}
            <SelectOrder
              selectOrder={selectOrder}
              setSelectOrder={setSelectOrder}
              setPage={setPage}
            />
            {/* Genres Select for filtering*/}
            <SelectGenres
              selectGenres={selectGenres}
              setSelectGenres={setSelectGenres}
              setPage={setPage}
            />
          </FlexBox>
        </Box>
        {/* Movies and pagination */}
        <Box pt="1rem" width="100%">
          {/* Movies grid */}
          {isLoading || isFetching ? (
            <Loading minHeight="50svh" />
          ) : isError ? (
            <GeneralError />
          ) : data.movies.length > 1 ? (
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
              {data.movies.map((movie) => (
                <MovieCard key={movie.movieid} movie={movie} />
              ))}
            </Box>
          ) : (
            <FlexBoxCenter minHeight="25dvh">
              <Typography
                variant="h3"
                fontStyle="oblique"
                color={theme.palette.grey[200]}
              >
                There are no movies matching your search criteria!
              </Typography>
            </FlexBoxCenter>
          )}
          {/* Movies pagination */}
          {!isLoading &&
          !isFetching &&
          !isError &&
          data.movies != null &&
          data.movies.length >= 1 ? (
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
      </Box>
    </>
  );
};

export default Movies;
