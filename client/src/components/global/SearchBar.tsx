import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";
import useClickOutside from "@/shared/hooks/clickOutside";
import FlexBox from "@/shared/FlexBox";
import SearchMovie from "./SearchMovie";
import { useQuery } from "@tanstack/react-query";
import { getMoviesSearch } from "@/api";
import { SearchMovieType } from "@/shared/types";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const SearchBar = () => {
  const theme = useTheme();
  const searchBox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [searchToggle, setSearchToggle] = useState<boolean>(false);
  //close search when clicking outside
  useClickOutside<boolean>(searchBox, setSearchToggle, false);

  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["movies", debouncedSearch],
    queryFn: async () => {
      const { data } = await getMoviesSearch(1, `search=${debouncedSearch}`);
      return data as { movies: SearchMovieType[]; totalPages: number };
    },
    enabled: debouncedSearch.length > 3 && searchToggle,
    refetchOnWindowFocus: false,
  });

  //auto-focus input after animation
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    const waitTimeout = setTimeout(() => focusInput(), 800);
    if (searchToggle) waitTimeout;
    return () => clearTimeout(waitTimeout);
  }, [searchToggle]);

  useEffect(() => {
    if (!searchToggle) {
      setInputSearch("");
      setDebouncedSearch("");
    }
  }, [searchToggle]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    setTimeout(() => {
      setDebouncedSearch(e.target.value);
    }, 3000);
  };
  return (
    <FlexBox
      height="100%"
      width="100%"
      ref={searchBox}
      justifyContent="flex-end"
    >
      {/* Search icon (not opened) */}
      <Fade in={!searchToggle} timeout={2000}>
        <IconButton
          sx={
            searchToggle
              ? {
                  transition: "1s",
                  cursor: "pointer",
                  color: theme.palette.grey[900],
                  bgcolor: "white",
                  display: "none",
                }
              : {
                  transition: "1s",
                  cursor: "pointer",
                  color: theme.palette.grey[900],
                  bgcolor: "white",
                  display: "inline-flex",
                  p: 0.6,
                  marginRight: { xs: "0.25rem", md: "0.5rem" },
                  position: "absolute",
                  "& :hover": {
                    color: "whitesmoke",
                  },
                }
          }
          aria-label="open-search"
          onClick={() => setSearchToggle((prev) => !prev)}
        >
          <SearchIcon fontSize="medium" />
        </IconButton>
      </Fade>
      {/* Search input (opened)  */}
      <Grow
        in={searchToggle}
        style={{ transformOrigin: "right center 0" }}
        {...(searchToggle ? { timeout: 1000 } : {})}
      >
        <Paper
          sx={{
            position: "relative",
            marginRight: { xs: "0.25rem", md: "0.5rem" },
            display: "flex",
            height: "85%",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "25px",
            border: `1px solid ${theme.palette.tertiary[500]}`,
            maxWidth: "min(450px,100%)",
            minWidth: {
              xs: "max(270px,100%)",
              md: "min(250px,100%)",
              lg: "min(350px,100%)",
            },
            "& #nav-search": {
              width: "100%",
              height: "100%",
              border: "none",
              fontSize: "1rem",
              outline: "none",
              color: theme.palette.grey[400],
            },
          }}
        >
          <IconButton
            // disabled
            sx={{
              height: "90%",
              cursor: "pointer",
              color: theme.palette.grey[500],
              bgcolor: "white",
            }}
            aria-label="close-search"
            onClick={() => setSearchToggle((prev) => !prev)}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
          <input
            ref={inputRef}
            id="nav-search"
            type="text"
            aria-label="search"
            placeholder="Search movie..."
            value={inputSearch}
            onChange={changeInput}
            autoComplete="off"
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
          {/* Dropdown div with items list */}
          <Box
            display={searchToggle && inputSearch.length > 3 ? "block" : "none"}
            className={searchToggle && inputSearch.length > 3 ? "visible" : ""}
            position="absolute"
            bgcolor="white"
            width="99%"
            boxShadow="0px 8px 10px 0px rgba(0, 0, 0, 0.2)"
            fontSize="1.1rem"
            top="105%"
            zIndex="500"
            sx={{
              opacity: 0,
              transition: "opacity 1s ease-in-out",
              marginInline: "auto",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              "&.visible": {
                opacity: 1,
              },
            }}
          >
            <Box
              component="ul"
              display="flex"
              flexDirection="column"
              paddingLeft="10px"
              rowGap="5px"
              paddingY="5px"
              sx={{
                paddingInlineStart: 0,
                listStyleType: "none",
                marginBlockStart: 0,
                marginBlockEnd: 0,
                "&>li": {
                  textDecoration: "none",
                  color: theme.palette.grey[300],
                  marginInline: "auto",
                  width: "95%",
                },
                "&>li>a": {
                  color: theme.palette.secondary[300],
                },
                "&>li.li-result:hover": {
                  bgcolor: theme.palette.primary[100],
                },
                "&>li.li-no_result": {
                  cursor: "not-allowed",
                  userSelect: "none",
                  fontSize: "1.1em",
                  textAlign: "center",
                },
              }}
            >
              {!isError &&
              !isFetching &&
              !isLoading &&
              data.movies.length > 0 ? (
                data.movies.map((movie: SearchMovieType) => (
                  <li className="li-result">
                    <Link
                      onClick={() => {
                        setSearchToggle((prev) => !prev);
                        setInputSearch("");
                        setDebouncedSearch("");
                      }}
                      key={movie.movieid}
                      to={`/movies/${movie.movieid}`}
                    >
                      <SearchMovie
                        poster_path={movie.poster_path}
                        title={movie.title}
                      />
                    </Link>
                  </li>
                ))
              ) : isLoading || isFetching ? (
                <li className="li-no_result">
                  <Loading minHeight="30svh" />
                </li>
              ) : (
                <li className="li-no_result">Nothing matched your search</li>
              )}
            </Box>
          </Box>
        </Paper>
      </Grow>
    </FlexBox>
  );
};

export default SearchBar;
