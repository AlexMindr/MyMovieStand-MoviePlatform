import { Router } from "express";
import {
  getMovies,
  getMovie,
  getMoviesFiltered,
  getMoviesSimpleFilter,
  getHomeMovies,
  populateMovies,
  createMovie,
  updatePopularityAndRating,
  updateMovie,
  //deleteMovie,
  pop
} from "../controllers/movies.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.get("/page=:page/filter", getMoviesFiltered);
router.get("/page=:page/search", getMoviesSimpleFilter);
router.get("/page=:page", getMovies);
router.get("/movie=:id", getMovie);
router.get("/get/home", getHomeMovies);

router.post("/pop",  pop);

router.post("/populate", authAdmin, populateMovies);
router.post("/create", authAdmin, createMovie);
router.put("/update", authAdmin, updateMovie);
router.put("/update/popularity/all", authAdmin, updatePopularityAndRating);
//router.delete("/delete/:id", deleteMovie);

export default router;
