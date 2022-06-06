import { Router } from "express";
import {
  getMovieRecommendations,
  getUserRecommendations,
} from "../controllers/recommendations.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/user", auth, getUserRecommendations);
router.post("/movie/:movieid", auth, getMovieRecommendations);

export default router;
