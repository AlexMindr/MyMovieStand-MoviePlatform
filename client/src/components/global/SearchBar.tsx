import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { MutableRefObject, SetStateAction, useRef, useState } from "react";
import { Theme } from "@mui/material";

type Props = {
  flexBasis: { xs: string; sm: string; md: string; lg: string };
  theme: Theme;
};

const SearchBar = ({ flexBasis, theme }: Props) => {
  const searchBox = useRef(null);

  const [inputSearch, setInputSearch] = useState<string>("");
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    //searchContent(inputSearch);
  };

  return (
    <Box
      ref={searchBox}
      flexBasis={flexBasis}
      alignItems="center"
      justifyContent="flex-end"
      position="relative"
      display="flex"
      marginRight={{ xs: "0.2rem", md: "0.5rem" }}
      overflow="hidden"
    >
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
                p: 0.75,
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
      <Slide
        timeout={500}
        direction="left"
        in={searchToggle}
        container={searchBox.current}
      >
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "25px",
            maxWidth: "450px",
            minWidth: "350px",
            "& input": {
              width: "90%",
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
            onClick={() => setSearchToggle((prev) => !prev)}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
          <input
            type="text"
            aria-label="search"
            placeholder="Search movie..."
            value={inputSearch}
            onChange={changeInput}
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
        </Paper>
      </Slide>

      <Box
        className={
          searchToggle && inputSearch !== ""
            ? "dropdown-search open"
            : "dropdown-search"
          // searchToggle === "container2 active" && inputSearch !== ""
          //   ? "dropdown-search open"
          //   : "dropdown-search"
        }
      >
        {/* {searchResult && searchResult.length > 0 ? (
            searchResult.map((movie) => (
              <Link
                onClick={closeSearchClick}
                key={movie.movieid}
                to={`/movies/${movie.movieid}`}
              >
                <MovieSearchList
                  poster={movie.poster_path}
                  title={movie.title}
                />
              </Link>
            ))
          ) : (
            <Button disabled variant="text">
              Nothing matched your search
            </Button>
          )} */}
      </Box>
    </Box>
  );
};

export default SearchBar;
