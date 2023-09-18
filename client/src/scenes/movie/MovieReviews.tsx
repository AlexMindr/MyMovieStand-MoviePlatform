import { getMovieReviews } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import GeneralError from "@/components/error/GeneralError";
import Loading from "@/components/global/Loading";
import { ReviewType } from "@/shared/types";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";
import EditorDisplay from "@/components/global/EditorDisplay";
import { useMemo } from "react";

type Props = { movieid: number };

const MovieReviews = ({ movieid }: Props) => {
  const { palette } = useTheme();
  //TODO change to store
  const storeUserReviews = [{ movieid: 0 }];
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ["movie-reviews", movieid],
    queryFn: async () => {
      const { data } = await getMovieReviews(movieid, 1, 4);

      return data as { reviews: ReviewType[] };
    },
    retry: 2,
    refetchOnWindowFocus: true,
    staleTime: 500,
  });

  //check if user has review for current movie
  const userHasReview = useMemo(
    () =>
      storeUserReviews.filter((review) => review.movieid === movieid).length >
      0,
    [storeUserReviews, movieid]
  );

  if (isLoading || isFetching) return <Loading minHeight="30svh" />;
  if (isError) return <GeneralError />;

  const { reviews } = data;
  return (
    <Box p="10px" component="section">
      <FlexBox
        className="review-title-box"
        // flexWrap="wrap"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Typography variant="h5" alignSelf="flex-start">
          User Reviews
        </Typography>
        <Divider flexItem />
        <Link
          to={`/movies/${movieid}/addreview`}
          style={{
            alignSelf: "flex-end",
            textShadow: `1px 1px 1px ${
              userHasReview ? palette.primary[300] : palette.secondary[100]
            }`,
            fontWeight: "bolder",
            color: palette.tertiary[800],
          }}
        >
          {userHasReview ? "Edit your review" : "Add review"}
        </Link>
      </FlexBox>
      {reviews.length > 0 ? (
        <FlexBoxCenter component="ul" className="review-reviews-box">
          {reviews.map((review) => (
            // <MovieReview
            //   key={review.reviewid}
            //   review={review}
            //   setRefresh={setRefresh}
            // />
            <EditorDisplay content={review.content} />
          ))}
        </FlexBoxCenter>
      ) : (
        <></>
      )}
      <FlexBoxCenter p="10px">
        {reviews.length > 0 ? (
          <Link
            to={`/movies/${movieid}/reviews/all`}
            style={{
              textShadow: `1px 1px 1px orange`,
              fontWeight: "bolder",
              color: palette.tertiary[800],
            }}
          >
            Show all reviews
          </Link>
        ) : (
          <span style={{ fontStyle: "italic" }}>
            No reviews have been added for this movie
          </span>
        )}
      </FlexBoxCenter>
    </Box>
  );
};

export default MovieReviews;
