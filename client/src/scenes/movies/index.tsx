import { getMovies, getMovie, getGenres } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GenreType, MovieType } from "@/shared/types";
import Loading from "@/components/global/Loading";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material";
import ContainerTitle from "@/shared/ContainerTitle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
//import Breadcrumbs from "@mui/material/Breadcrumbs";
//import Link as MuiLink from "@mui/material/Link";
//import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useSetTitle from "@/shared/hooks/setTitle";
import MovieCard from "@/components/movies/MovieCard";
import GeneralError from "@/components/error/GeneralError";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { useParams, useSearchParams } from "react-router-dom";
import FlexBox from "@/shared/FlexBox";

const pageTitle = "Browse Movies";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
    },
  },
};

const Movies = () => {
  const theme = useTheme();
  useSetTitle(pageTitle);
  const [pageParams, setPageParams] = useSearchParams({ page: "1" });
  const [inputSearch, setInputSearch] = useState("");
  const [selectSort, setSelectSort] = useState("");
  const [selectOrder, setSelectOrder] = useState("");
  const [selectGenres, setSelectGenres] = useState<string[]>([]);

  const page = parseInt(pageParams?.get("page") || "1");
  const {
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
    error: errorGenres,
    data: dataGenres,
    isFetching: isFetchingGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await getGenres();
      return data as GenreType[];
    },
    staleTime: 60000,
  });
  console.log(dataGenres);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["movies", { page }],
    queryFn: async () => {
      const { data } = await getMovies(page);
      return data as { movies: MovieType[]; totalPages: number };
    },
    keepPreviousData: true,
    staleTime: 60000,
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };
  const handleChangeSort = (event: SelectChangeEvent) => {
    setSelectSort(event.target.value);
  };
  const handleChangeOrder = (event: SelectChangeEvent) => {
    setSelectOrder(event.target.value);
  };
  const handleChangeGenres = (
    event: SelectChangeEvent<typeof selectGenres>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const pageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPageParams({ page: value.toString() });
  };

  if (isLoading || isFetching || isFetchingGenres || isLoadingGenres)
    return <Loading />;
  if (isError || isErrorGenres) return <GeneralError />;
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
          component="div"
          //display="flex"
        >
          <Box
            display={{ xs: "block", lg: "flex" }}
            marginTop={"1rem"}
            marginBottom={"0.25rem"}
          >
            <FlexBox
              flexBasis={{ lg: "50%" }}
              justifyContent="center"
              maxWidth={"500px"}
              marginX={"auto"}
            >
              <FlexBoxCenter
                width="100%"
                borderRadius="10px"
                border={`2px solid ${theme.palette.primary[700]}`}
                // maxWidth="450px"
                // minWidth={{ md: "270px", lg: "350px" }}
                sx={{
                  "& input": {
                    width: "80%",
                    height: "100%",
                    border: "none",
                    fontSize: "1rem",
                    outline: "none",
                    overflow: "hidden",
                  },
                }}
              >
                <IconButton
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.grey[500],
                    bgcolor: "white",
                  }}
                  aria-label="close-search"
                  // onClick={() => setSearchToggle((prev) => !prev)}
                >
                  <SearchIcon fontSize="medium" />
                </IconButton>
                <input
                  type="text"
                  aria-label="search"
                  placeholder="Search movie..."
                  value={inputSearch}
                  onChange={handleChangeInput}
                />
                <IconButton
                  sx={{
                    cursor: "pointer",
                    color: theme.palette.grey[200],
                  }}
                  onClick={() => setInputSearch(() => "")}
                >
                  <ClearIcon />
                </IconButton>
              </FlexBoxCenter>
            </FlexBox>
            <FlexBox
              flexBasis={{ lg: "50%" }}
              justifyContent="flex-end"
              marginLeft="auto"
            >
              <Box component="div" minWidth="100px" m={1}>
                <FormControl
                  fullWidth
                  variant="standard"
                  //className="select-item"
                >
                  <InputLabel id="select-sort-label">Sort</InputLabel>
                  <Select
                    labelId="select-sort-label"
                    value={selectSort}
                    id="select-sort"
                    label="Sort"
                    onChange={handleChangeSort}
                    autoWidth
                  >
                    <MenuItem value={""}>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"release_date"}>Date</MenuItem>
                    <MenuItem value={"rating"}>Score</MenuItem>
                    <MenuItem value={"popularity"}>Popularity</MenuItem>
                    <MenuItem value={"duration"}>Duration</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box component="div" minWidth="100px" m={1}>
                <FormControl
                  fullWidth
                  variant="standard"
                  // className="select-item"
                >
                  <InputLabel id="select-order-label">Order</InputLabel>
                  <Select
                    labelId="select-order-label"
                    id="select-order"
                    value={selectOrder}
                    label="Order"
                    onChange={handleChangeOrder}
                  >
                    <MenuItem value={"ASC"}>Ascending</MenuItem>
                    <MenuItem value={"DESC"}>Descending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                component="div"
                minWidth={{ xs: "100px", md: "150px", lg: "200px" }}
                m={1}
              >
                <FormControl
                  variant="standard"
                  sx={{ width: { xs: "100px", md: "150px", lg: "200px" } }}
                >
                  <InputLabel id="select-genres-multiple-checkbox-label">
                    Genres
                  </InputLabel>
                  <Select
                    labelId="select-genres-multiple-checkbox-label"
                    id="select-genres-multiple-checkbox"
                    multiple
                    value={selectGenres}
                    onChange={handleChangeGenres}
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {dataGenres.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={selectGenres.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </FlexBox>
          </Box>

          {/* Movies grid */}
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
            alignItems="center"
            sx={{
              paddingInlineStart: 0,
              paddingInline: "10px",
              marginBlockEnd: 0,
              marginBlockStart: 0,
              "&>li": {
                justifySelf: "center",
              },
            }}
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
              p="1rem"
              minWidth="100%"
              //className="container-pagination"
            >
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
      </>
    );
};

export default Movies;
