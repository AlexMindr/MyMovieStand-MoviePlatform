import { Router } from "express";
import {
  getGenres,
  createGenres,
  updateGenres
} from "../controllers/genres.js";
//import auth from "../middlewares/auth.mjs";

const router = Router();

router.get("/", getGenres);
router.post("/create",createGenres)
router.put("/update",updateGenres)

export default router;