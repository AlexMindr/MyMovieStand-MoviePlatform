import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getMovieImages } from "@/api";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { MovieImageObjType } from "@/shared/types";
import { Suspense, lazy } from "react";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import Keywords from "@/components/movie/Keywords";

const HorizMovieImages = lazy(
  () => import("@/components/movie/HorizMovieImages")
);

type Props = {
  tmdb_id: number;
  revenue: number;
  budget: number;
  keywords: string;
  title: string;
};

const GalleryFinancialKw = ({
  tmdb_id,
  revenue,
  budget,
  keywords,
  title,
}: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: images,
    isFetching,
  } = useQuery({
    queryKey: ["movie_images", tmdb_id],
    queryFn: async () => {
      const { data } = await getMovieImages(tmdb_id.toString());
      return data as MovieImageObjType;
    },
    refetchOnWindowFocus: false,
    staleTime: 500,
    enabled: tmdb_id > 0,
  });

  if (isLoading || isFetching) return <Loading minHeight="30svh" />;
  if (isError) return <GeneralError />;

  return (
    <Box display={{ xs: "block", md: "flex" }} width="100%">
      <Box
        flexBasis={{ xs: "100%", md: "65%", xl: "60%" }}
        p="8px"
        maxWidth={{ xs: "100%", md: "65%", xl: "60%" }}
      >
        <Typography variant="h5" width="100%">
          Gallery
        </Typography>
        <Divider flexItem />
        {/* Load images lazy */}
        <Suspense fallback={<Loading minHeight="30svh" />}>
          <HorizMovieImages images={images} title={title} />
        </Suspense>
      </Box>
      {/* Budget, Revenue, Keywords */}
      <FlexBoxCenter
        sx={{
          bgcolor: "rgba(255,255,255,0.25)",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          // "&>h6,span": { width: "100%" },
        }}
        flexBasis={{ xs: "100%", md: "35%", xl: "40%" }}
        maxWidth={{ xs: "100%", md: "35%", xl: "40%" }}
        flexDirection={"column"}
        flexWrap={"wrap"}
      >
        <Typography variant="h6">Budget</Typography>
        <Typography component="span">
          {budget && budget > 0
            ? new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
                notation: "compact",
              }).format(budget)
            : "N/A"}
        </Typography>
        <Typography variant="h6">Revenue</Typography>
        <Typography component="span">
          {revenue && revenue > 0
            ? new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
                notation: "compact",
              }).format(revenue)
            : "N/A"}
        </Typography>
        <Typography variant="h6">Keywords</Typography>
        <Keywords keywords={keywords} />
      </FlexBoxCenter>
    </Box>
  );
};

export default GalleryFinancialKw;
