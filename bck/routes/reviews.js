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
} from "../controllers/reviews.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addReview);
router.get("/get/home",getHomeReviews);
router.get("/get/moviereview/:movieid",auth,getReview);
router.get("/get/movie/:movieid",getMovieReviews);
router.get("/get/user",auth,getUserReviews);
router.get("/get/userinit",auth,getUserReviewsAndLikes);
router.delete("/delete/:movieid",auth,deleteReview);
router.put("/update",auth,updateReview);

export default router;