import { Router } from "express";
import {
  getMovieRecommendations,
  getUserRecommendations,
} from "../controllers/recommendations.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);
router
  .post("/user", getUserRecommendations)
  .post("/movie/:movieid", getMovieRecommendations);

export default router;
