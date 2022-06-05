import { Router } from "express";
import {
  getMovies,
  getMovie,
  populateMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesFiltered,
  getMoviesSimpleFilter,
  getHomeMovies,
  updatePopularityAndRating
} from "../controllers/movies.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.get("/page=:page/filter",getMoviesFiltered)
router.get("/page=:page/search",getMoviesSimpleFilter)
router.get("/page=:page", getMovies);
router.get("/movie=:id",getMovie)
router.get("/get/home",getHomeMovies)
router.post("/populate",populateMovies)
router.post("/create",createMovie)
router.put("/update",updateMovie)
router.put("/update/popularity/all",updatePopularityAndRating)
router.delete("/delete/:id",deleteMovie)

export default router;