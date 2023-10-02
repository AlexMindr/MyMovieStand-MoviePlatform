import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { GenreType } from "@/shared/types";
import FlexBox from "@/shared/FlexBox";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import colorRGBA from "@/shared/functions/colorRGBA";
import LangStatusRating from "@/components/movie/LangStatusRating";
import GenresBox from "@/components/movie/GenresBox";
import AiringDetails from "@/components/movie/AiringDetails";
import RatingBox from "@/components/movie/RatingBox";
import SynopsisTrailer from "@/components/movie/SynopsisTrailer";
import WatchListBox from "@/components/movie/WatchListBox";
import imageUnavailable from "@/assets/ImageNotAvailable.png";

type Props = {
  adult: boolean;
  homepage: string;
  imdb_id: string;
  tmdb_id: number;
  language: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  duration: string;
  status: string;
  title: string;
  trailer: string;
  popularity: number;
  uscertification: string;
  rating: number;
  Genres: GenreType[];
};

const MovieInfoPoster = ({
  status,
  popularity,
  uscertification,
  rating,
  Genres,
  poster_path,
  release_date,
  duration,
  adult,
  title,
  language,
  homepage,
  imdb_id,
  tmdb_id,
  trailer,
  overview,
}: Props) => {
  const { palette } = useTheme();
  return (
    <Box
      display={{ xs: "block", md: "flex" }}
      bgcolor={colorRGBA(palette.watchlistBg.main, "0.95")}
    >
      {/* Poster */}
      <FlexBox
        justifyContent={{ xs: "center", md: "flex-end" }}
        flexBasis={{ md: "35%", lg: "25%" }}
        p={{ xs: "0.75rem", md: "0.75rem 0 0.75rem 0.75rem" }}
      >
        <img
          style={{
            objectFit: "contain",
            width: "clamp(200px,100%,350px)",
          }}
          alt={title}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : imageUnavailable
          }
          placeholder={imageUnavailable}
        />
      </FlexBox>
      {/* Essential Info and Trailer */}
      <FlexBoxCenter
        flexBasis={{ md: "65%", lg: "75%" }}
        flexDirection="column"
        p="0.5rem"
      >
        {/* Type,Lang,Status & Rating */}
        <LangStatusRating
          status={status}
          language={language}
          uscertification={uscertification}
          adult={adult}
        />
        {/* Genres */}
        <GenresBox Genres={Genres} />
        {/* Airing details - duration & release_date */}
        <AiringDetails duration={duration} release_date={release_date} />
        {/* Popularity, Rating, Link to external sites */}
        <RatingBox
          rating={rating}
          popularity={popularity}
          homepage={homepage}
          tmdb_id={tmdb_id}
          imdb_id={imdb_id}
        />
        {/* Synopsis & Trailer */}
        <SynopsisTrailer trailer={trailer} overview={overview} title={title} />
        {/* TODO Logic for user watchlist */}
        {/* Add to watchlist/edit */}
        <WatchListBox />
      </FlexBoxCenter>
    </Box>
  );
};

export default MovieInfoPoster;
