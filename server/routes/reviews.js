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
  .get("/get/movie=:movieid/page=:page/count=:count", getMovieReviews)
  .get("/get/likes/review=:reviewid", getLikesForReview)
  .get("/get/user=:username/profile/page=:page/count=:count", getUserReviews);

router.use(auth);
router
  .get("/get/user/movie=:movieid", getReview)
  .get("/get/user/init", getUserReviewsAndLikes)
  .post("/add", addReview)
  .put("/update", updateReview)
  .put("/dislike", dislikeReview)
  .put("/like", likeReview)
  .delete("/delete/:movieid", deleteReview);

export default router;
