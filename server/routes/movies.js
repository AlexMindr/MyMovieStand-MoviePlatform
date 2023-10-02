import { Router } from "express";
import {
  getMovies,
  getMovie,
  getMovieImages,
  getMovieCredits,
  getMoviesFiltered,
  getMoviesSimpleFilter,
  getHomeMovies,
} from "../controllers/movies.js";

const router = Router();

router.get("/amount=:amount/filter", getMoviesFiltered);
router.get("/search", getMoviesSimpleFilter);
router.get("/get/page=:page", getMovies);
router.get("/movie=:id", getMovie);
router.get("/images/movie=:tmdb_id", getMovieImages);
router.get("/credits/movie=:tmdb_id", getMovieCredits);
router.get("/get/home", getHomeMovies);

export default router;
