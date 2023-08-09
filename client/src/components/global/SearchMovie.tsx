import FlexBox from "@/shared/FlexBox";
import Typography from "@mui/material/Typography";
import React from "react";

type Props = {
  poster_path: string;
  title: string;
};

const SearchMovie = ({ poster_path, title }: Props) => {
  return (
    <FlexBox
      width="100%"
      height="100%"
      flexDirection="row"
      flexWrap="nowrap"
      columnGap="0.5rem"
      justifyContent="left"
      sx={{
        "&>img": {
          width: "40px",
          height: "60px",
        },
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
      <Typography component="h5" overflow="hidden">
        {title}
      </Typography>
    </FlexBox>
  );
};

export default SearchMovie;
