import { Router } from "express";
import {
  addReview,
  getHomeReviews,
  getMovieReviews,
  getUserReviews,
  getLikesForReview,
  getUserReviewsAndLikes,
  getReview,
  updateReview,
  likeReview,
  dislikeReview,
  deleteReview,
} from "../controllers/reviews.js";
import auth from "../middleware/auth.js";

const router = Router();

router
  .get("/get/home", getHomeReviews)
  .get("/get/movie/:movieid/page=:page/count=:count", getMovieReviews);

router.use(auth);
router
  .get("/get/likes/:reviewid", getLikesForReview)
  .get("/get/moviereview/:movieid", getReview)
  .get("/get/user/:username/page=:page/count=:count", getUserReviews)
  .get("/get/userinit", getUserReviewsAndLikes)
  .post("/add", addReview)
  .put("/update", updateReview)
  .put("/dislike", dislikeReview)
  .put("/like", likeReview)
  .delete("/delete/:movieid", deleteReview);

export default router;
