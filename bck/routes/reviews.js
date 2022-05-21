import { Router } from "express";
import { 
 addReview,
 deleteReview,
 getHomeReviews,
 getMovieReviews,
 getUserReviews,
 updateReview
} from "../controllers/reviews.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addReview);
router.get("/get/home",getHomeReviews);
router.get("/get/movie/:movieid",getMovieReviews);
router.get("/get/user",auth,getUserReviews);
router.delete("/delete",auth,deleteReview);
router.put("/update",auth,updateReview);

export default router;