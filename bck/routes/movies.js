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
} from "../controllers/movies.js";
//import auth from "../middlewares/auth.mjs";

const router = Router();

router.get("/page=:page/filter",getMoviesFiltered)
router.get("/page=:page/search",getMoviesSimpleFilter)
router.get("/page=:page", getMovies);
router.get("/movie=:id",getMovie)
router.post("/populate",populateMovies)
router.post("/create",createMovie)
router.put("/update/:movieid",updateMovie)
router.delete("/delete/:id",deleteMovie)

export default router;