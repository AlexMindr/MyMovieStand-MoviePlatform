import { Router } from "express";
import {
  getMovies,
  getMovie,
  populateMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movies.js";
//import auth from "../middlewares/auth.mjs";

const router = Router();

router.get("/", getMovies);
router.get("/:id",getMovie)
router.post("/populate",populateMovies)
router.post("/create",createMovie)
router.put("/update/:movieid",updateMovie)
router.delete("/delete/:id",deleteMovie)

export default router;