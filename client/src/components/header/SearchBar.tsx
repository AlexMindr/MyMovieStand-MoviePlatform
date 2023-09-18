import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useRef, useState, useDeferredValue, useMemo } from "react";
import { useTheme } from "@mui/material";
import useClickOutside from "@/shared/hooks/clickOutside";
import FlexBox from "@/shared/FlexBox";
import SearchDropdown from "./SearchDropdown";

const SearchBar = () => {
  const theme = useTheme();
  const searchBox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const debouncedSearch = useDeferredValue(inputSearch);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);
  //close search when clicking outside
  useClickOutside<boolean>(searchBox, setSearchToggle, false);

  //auto-focus input after animation
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  useEffect(() => {
    const waitTimeout = setTimeout(() => focusInput(), 800);
    if (searchToggle) waitTimeout;
    return () => clearTimeout(waitTimeout);
  }, [searchToggle]);

  //clear search when closed
  useEffect(() => {
    if (!searchToggle) {
      setInputSearch("");
    }
  }, [searchToggle]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const memoizedMoviesSearch = useMemo(
    () => (
      <SearchDropdown
        searchToggle={searchToggle}
        debouncedSearch={debouncedSearch}
        setInputSearch={setInputSearch}
        setSearchToggle={setSearchToggle}
      />
    ),
    [searchToggle, debouncedSearch]
  );

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
            spellCheck="false"
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
          {memoizedMoviesSearch}
        </Paper>
      </Grow>
    </FlexBox>
  );
};

export default SearchBar;
