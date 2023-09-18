import { getMovies } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useDeferredValue, memo } from "react";
import { MovieType } from "@/shared/types";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ContainerTitle from "@/shared/ContainerTitle";
import useSetTitle from "@/shared/hooks/setTitle";
import FlexBox from "@/shared/FlexBox";
import SelectGenres from "@/scenes/movies/SelectGenres";
import SearchBox from "@/scenes/movies/SearchBox";
import SelectSort from "@/scenes/movies/SelectSort";
import SelectOrder from "@/scenes/movies/SelectOrder";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import buildQuery, { getParamsObject } from "@/shared/functions/buildQuery";
import MoviesGrid from "./MoviesGrid";

const PageTitle = "Browse Movies";

const MemoizedMoviesGrid = memo(MoviesGrid);

const Movies = () => {
  useSetTitle(PageTitle);
  const [pageParams, setPageParams] = useSearchParams({
    page: "1",
    title: "",
    sort: "",
    order: "",
    genres: "",
  });

  //get params from url after checks/processing
  const pageParamsObject = useMemo(
    () => getParamsObject(pageParams),
    [pageParams]
  );

  const [inputSearch, setInputSearch] = useState(pageParamsObject.title);
  const searchDebounced = useDeferredValue(inputSearch);
  const [selectSort, setSelectSort] = useState(pageParamsObject.sort);
  const [selectOrder, setSelectOrder] = useState(pageParamsObject.order);
  const [selectGenres, setSelectGenres] = useState<string[]>(
    pageParamsObject.genres
  );
  const [page, setPage] = useState(pageParamsObject.page);

  //build the filter query
  const query = useMemo(
    () => buildQuery(inputSearch, selectSort, selectOrder, selectGenres, page),
    [inputSearch, page, selectGenres, selectOrder, selectSort]
  );

  //data fetching
  const { isLoading, isError, data, isFetching } = useQuery({
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
        {/* Movies grid with pagination */}
        {isLoading || isFetching ? (
          <Loading minHeight="50svh" />
        ) : isError ? (
          <GeneralError />
        ) : (
          <MemoizedMoviesGrid data={data} page={page} setPage={setPage} />
        )}
      </Box>
    </>
  );
};

export default Movies;
