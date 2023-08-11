import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { GenreType } from "@/shared/types";
import { Link } from "react-router-dom";

type Props = {
  Genres: GenreType[];
};
const genresMaxLen = 6;

const MovieCardGenres = ({ Genres }: Props) => {
  const theme = useTheme();

  return (
    <FlexBoxCenter
      component="div"
      flexWrap="wrap"
      columnGap="4px"
      rowGap="2px"
      // width="100%"
      minHeight="3rem"
      bgcolor={theme.palette.secondary[100]}
    >
      {Genres.slice(0, genresMaxLen).map((genre) => (
        <Box
          key={genre.genreid}
          bgcolor={theme.palette.tertiary[700]}
          p="2px 6px"
          borderRadius="30px"
          fontSize="0.8rem"
          color={theme.palette.grey[100]}
          fontWeight="500"
        >
          <Link
            to={`/movies?genres=${encodeURIComponent(genre.name)}`}
            style={{ color: "inherit" }}
            reloadDocument
          >
            {genre.name}
          </Link>
        </Box>
      ))}
      {Genres.length > genresMaxLen ? (
        <Box
          bgcolor={theme.palette.tertiary[700]}
          p="2px 6px"
          minWidth="12px"
          borderRadius="30px"
          fontSize="0.8rem"
          color={theme.palette.grey[100]}
          fontWeight="500"
        >
          ...
        </Box>
      ) : (
        <></>
      )}
    </FlexBoxCenter>
  );
};

export default MovieCardGenres;
