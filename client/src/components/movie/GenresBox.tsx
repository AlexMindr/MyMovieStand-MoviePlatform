import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import { useTheme } from "@mui/material";
import { GenreType } from "@/shared/types";
import { useMemo } from "react";

type Props = {
  Genres: GenreType[];
};

const GenresBox = ({ Genres }: Props) => {
  const { palette } = useTheme();
  const genresMap = useMemo(() => {
    return Genres.map(({ genreid, name }) => (
      <Box
        component="li"
        key={genreid}
        bgcolor={palette.secondary[400]}
        p="2px 6px"
        borderRadius="30px"
        fontSize="0.85rem"
        color={palette.grey[100]}
        fontWeight="500"
      >
        <Link
          to={`/movies?genres=${encodeURIComponent(name)}`}
          style={{ color: "inherit" }}
          reloadDocument
        >
          {name}
        </Link>
      </Box>
    ));
  }, [Genres, palette]);
  return (
    <FlexBoxCenter width="100%" bgcolor={palette.primary[200]} minHeight="2rem">
      <FlexBoxCenter
        py="0.25rem"
        component="ul"
        flexWrap="wrap"
        columnGap="5px"
        rowGap="4px"
        sx={{
          paddingInlineStart: 0,
          paddingInline: "10px",
          marginBlockEnd: 0,
          marginBlockStart: 0,
          listStyleType: "none",
        }}
      >
        {genresMap}
      </FlexBoxCenter>
    </FlexBoxCenter>
  );
};

export default GenresBox;
