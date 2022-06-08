import React, { useEffect, useState } from "react";
import "./reviewspage.css";
import { useParams } from "react-router-dom";
import { getMovieReviews, getMovie } from "../../api";
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  StyledEngineProvider,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MovieReview } from "../../components";

const Reviewspage = () => {
  const [reviewList, setReviewsList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [movie, setMovie] = useState(null);
  const [err, setErr] = useState(null);
  const { reviews } = useSelector((state) => state.review);
  const { id } = useParams();
  const navigate = useNavigate();

  const pageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    async function getMoviebck() {
      const res = await getMovie(parseInt(id));
      if (res.data) setMovie(res.data);
      else {
        setErr("Movie doesn't exist!");
        navigate("/error");
      }
    }
    getMoviebck();
  }, [id, navigate]);

  useEffect(() => {
    async function getData() {
      const res = await getMovieReviews(parseInt(id), page, 10);
      setReviewsList(res.data.reviews);
      setTotalPages(res.data.totalPages);
    }

    getData();
  }, [id, page]);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2}>
        {movie && err === null ? (
          <>
            <Typography component="h2" variant="h3" className="Container-title">
              Reviews
            </Typography>
            <Box sx={{ p: 2 }} className="allreviews-box">
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontSize: "1.3rem" }}
              >
                You are viewing all user reviews about the movie:
              </Typography>
              <Link to={`/movies/${movie.movieid}`}>
                <Typography variant="h5" component="h4">
                  {movie.title}
                </Typography>
              </Link>
              <Box className="allreviews-addedit">
                {reviews.filter((rev) => rev.movieid === movie.movieid).length >
                0 ? (
                  <Link to={`/movies/${movie.movieid}/addreview`}>
                    Edit your review
                  </Link>
                ) : (
                  <Link to={`/movies/${movie.movieid}/addreview`}>
                    Add a review
                  </Link>
                )}
              </Box>
              <Divider flexItem sx={{ m: 1 }} />
              {reviewList === null ? (
                <div className="loading-allreviews">
                  <CircularProgress />
                </div>
              ) : reviewList.length >= 1 ? (
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container rowGap={1} columnSpacing={"10px"}>
                    {reviewList.map((review) => (
                      <Grid
                        item
                        xs={12}
                        key={review.reviewid}
                        className="allreviews-review"
                      >
                        <MovieReview review={review} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <div className="loading-allreviews">
                  <Typography
                    variant="h4"
                    sx={{ fontStyle: "oblique", color: "#a3abb3" }}
                  >
                    No reviews have been added for this movie
                  </Typography>
                </div>
              )}
            </Box>
          </>
        ) : (
          <div className="loading-allreviews">{err}</div>
        )}
        {reviewList && reviewList.length >= 1 ? (
          <Box className="allreviews-pagination">
            <Pagination
              count={totalPages}
              page={page ? page : 1}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              onChange={pageChange}
            />
          </Box>
        ) : (
          <></>
        )}
      </Paper>
    </StyledEngineProvider>
  );
};

export default Reviewspage;
