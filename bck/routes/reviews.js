import { Router } from "express";
import { 
 addReview,
 deleteReview,
 getHomeReviews,
 getMovieReviews,
 getUserReviews,
 updateReview,
 getUserReviewsAndLikes,
 getReview,
 likeReview,
 dislikeReview,
} from "../controllers/reviews.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addReview);
router.get("/get/home",getHomeReviews);
router.get("/get/moviereview/:movieid",auth,getReview);
router.get("/get/movie/:movieid/page=:page/count=:count",getMovieReviews);
router.get("/get/user/page=:page/count=:count",auth,getUserReviews);
router.get("/get/userinit",auth,getUserReviewsAndLikes);
router.delete("/delete/:movieid",auth,deleteReview);
router.put("/update",auth,updateReview);
router.put("/dislike",auth,dislikeReview);
router.put("/like",auth,likeReview);

export default router;