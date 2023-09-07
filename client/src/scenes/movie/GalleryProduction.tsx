import { getMovieCredits } from "@/api";
import GeneralError from "@/components/error/GeneralError";
import Loading from "@/components/global/Loading";
import { MovieCreditsObjType } from "@/shared/types";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
const VerticalImgList = lazy(
  () => import("@/components/movie/VerticalImgList")
);

type Props = {
  tmdb_id: number;
  title: string;
};

const GalleryProduction = ({ tmdb_id, title }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: credits,
    isFetching,
  } = useQuery({
    queryKey: ["movie_credits", tmdb_id],
    queryFn: async () => {
      const { data } = await getMovieCredits(tmdb_id.toString());
      return data as MovieCreditsObjType;
    },
    refetchOnWindowFocus: false,
    staleTime: 500,
    enabled: tmdb_id > 0,
  });

  if (isLoading || isFetching) return <Loading minHeight="30svh" />;
  if (isError) return <GeneralError />;

  const { cast, crew } = credits;
  const ImageListStyle = {
    maxWidth: "100%",
    height: "35rem",
    // display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gridAutoFlow: "row",
    overflow: "hidden scroll",
    borderBottom: "1px solid grey",
    borderLeft: "1px solid grey",
  };
  const ImageListItemSx = {
    display: "grid",
    gridTemplateColumns: "repeat(8,1fr)",
    gridAutoFlow: "row",
    height: "100%",
  };
  return (
    <Box display={{ xs: "block", md: "flex" }} width="100%" mt="1rem">
      {/* Cast */}
      <Box
        flexBasis={{ xs: "95%", md: "45%" }}
        p="8px"
        mx="auto"
        maxWidth={{ xs: "95%", md: "45%" }}
      >
        <Typography variant="h5" component="h4" width="100%">
          Cast
        </Typography>
        <Divider flexItem />
        <Suspense fallback={<Loading minHeight="30svh" />}>
          <VerticalImgList
            images={cast}
            ImageListStyle={{
              ...ImageListStyle,
            }}
            ImageListItemSx={{ ...ImageListItemSx }}
          />
        </Suspense>
      </Box>
      {/* Crew */}
      <Box
        flexBasis={{ xs: "95%", md: "45%" }}
        p="8px"
        mx="auto"
        maxWidth={{ xs: "95%", md: "45%" }}
      >
        <Typography variant="h5" component="h4" width="100%">
          Crew
        </Typography>
        <Divider flexItem />
        <Suspense fallback={<Loading minHeight="30svh" />}>
          <VerticalImgList
            images={crew}
            ImageListStyle={{
              ...ImageListStyle,
            }}
            ImageListItemSx={{ ...ImageListItemSx }}
          />
        </Suspense>
      </Box>
    </Box>
  );
};

export default GalleryProduction;
