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

router.get("/page=:page/filter", getMoviesFiltered);
router.get("/page=:page/search", getMoviesSimpleFilter);
router.get("/page=:page", getMovies);
router.get("/movie=:id", getMovie);
router.get("/movie=:tmdb_id/images", getMovieImages);
router.get("/movie=:tmdb_id/credits", getMovieCredits);
router.get("/get/home", getHomeMovies);

export default router;
