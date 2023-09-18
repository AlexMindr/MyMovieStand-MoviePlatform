import Box from "@mui/material/Box";
import { Dispatch, SetStateAction } from "react";
import { useTheme } from "@mui/material";
import SearchMovie from "@/components/header/SearchMovie";
import { useQuery } from "@tanstack/react-query";
import { getMoviesSearch } from "@/api";
import { SearchMovieType } from "@/shared/types";
import { Link } from "react-router-dom";
import Loading from "@/components/global/Loading";

type Props = {
  searchToggle: boolean;
  debouncedSearch: string;
  setSearchToggle: Dispatch<SetStateAction<boolean>>;
  setInputSearch: Dispatch<SetStateAction<string>>;
};

const SearchDropdown = ({
  searchToggle,
  debouncedSearch,
  setInputSearch,
  setSearchToggle,
}: Props) => {
  const { palette } = useTheme();

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ["movies-dropdown", debouncedSearch],
    queryFn: async () => {
      const { data } = await getMoviesSearch(1, `search=${debouncedSearch}`);
      return data as { movies: SearchMovieType[]; totalPages: number };
    },
    enabled: debouncedSearch.length > 3 && searchToggle,
    refetchOnWindowFocus: false,
  });

  const isVisible = searchToggle && debouncedSearch.length > 3;

  return (
    <Box
      display={isVisible ? "block" : "none"}
      className={isVisible ? "visible" : ""}
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
            color: palette.grey[300],
            marginInline: "auto",
            width: "95%",
          },
          "&>li>a": {
            color: palette.secondary[300],
          },
          "&>li.li-result:hover": {
            bgcolor: palette.primary[100],
          },
          "&>li.li-no_result": {
            cursor: "not-allowed",
            userSelect: "none",
            fontSize: "1.1em",
            textAlign: "center",
          },
        }}
      >
        {!isError && !isFetching && !isLoading && data.movies.length > 0 ? (
          data.movies.map((movie: SearchMovieType) => (
            <li className="li-result">
              <Link
                onClick={() => {
                  setSearchToggle((prev) => !prev);
                  setInputSearch("");
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
  );
};

export default SearchDropdown;
