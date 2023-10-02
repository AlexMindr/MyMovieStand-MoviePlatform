import { apiGetMoviesFiltered } from "@/api/movieApi";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useDeferredValue, memo } from "react";
import { MovieType } from "@/shared/types";
import { useLocation, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ContainerTitle from "@/shared/ContainerTitle";
import useSetTitle from "@/shared/hooks/setTitle";
import FlexBox from "@/shared/FlexBox";
import { getParamsObject } from "@/shared/functions/buildQuery";
import SelectGenres from "@/scenes/movies/SelectGenres";
import SearchBox from "@/scenes/movies/SearchBox";
import SelectSort from "@/scenes/movies/SelectSort";
import SelectOrder from "@/scenes/movies/SelectOrder";
import MoviesGrid from "@/scenes/movies/MoviesGrid";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material";

const PageTitle = "Browse Movies";

const MemoizedMoviesGrid = memo(MoviesGrid);

const Movies = () => {
  const isAboveMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const amount = encodeURIComponent(isAboveMd ? 12 : 10);

  useSetTitle(PageTitle);
  const location = useLocation();
  const [pageParams, setPageParams] = useSearchParams();

  //get params from url after checks/processing
  const pageParamsObject = useMemo(
    () => getParamsObject(pageParams),
    [pageParams]
  );

  const inputSearch = pageParamsObject.search;

  const keywords = pageParamsObject.keywords;
  const searchDebounced = useDeferredValue(inputSearch);
  const selectSort = pageParamsObject.sort;
  const selectOrder = pageParamsObject.order;
  const selectGenres = pageParamsObject.genres;
  const page = pageParamsObject.page;

  //data fetching
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: [
      "movies",
      {
        amount,
        page,
        searchDebounced,
        selectGenres,
        selectOrder,
        selectSort,
        keywords,
      },
    ],
    queryFn: async () => {
      const data = await apiGetMoviesFiltered(location.search, amount);
      return data as { movies: MovieType[]; totalPages: number };
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  return (
    <>
      {/* Page title */}
      <ContainerTitle variant="h2">{PageTitle}</ContainerTitle>
      <Box component="div">
        {/* Search & Filter  */}
        <Box
          width="100%"
          display={{ xs: "block", lg: "flex" }}
          marginBottom={"0.25rem"}
        >
          {/* Search box for filtering*/}
          <SearchBox
            inputSearch={inputSearch}
            keywords={keywords}
            setPageParams={setPageParams}
          />
          {/* Filter by genre/order/sort */}
          <FlexBox
            flexBasis={{ lg: "50%" }}
            justifyContent="flex-end"
            marginLeft="auto"
          >
            {/* Sort */}
            <SelectSort selectSort={selectSort} setPageParams={setPageParams} />
            {/* Order */}
            <SelectOrder
              selectOrder={selectOrder}
              setPageParams={setPageParams}
            />
            {/* Genres Select for filtering*/}
            <SelectGenres
              selectGenres={selectGenres}
              setPageParams={setPageParams}
            />
          </FlexBox>
        </Box>
        {/* Movies grid with pagination */}
        {isLoading || isFetching ? (
          <Loading minHeight="50svh" />
        ) : isError ? (
          <GeneralError />
        ) : (
          <MemoizedMoviesGrid
            data={data}
            page={page}
            setPageParams={setPageParams}
          />
        )}
      </Box>
    </>
  );
};

export default Movies;
