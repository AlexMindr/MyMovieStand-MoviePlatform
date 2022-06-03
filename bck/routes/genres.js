import { Router } from "express";
import {
  getGenres,
  createGenres,
  updateGenres
} from "../controllers/genres.js";
//import auth from "../middlewares/auth.mjs";

const router = Router();

router.get("/get", getGenres);
router.post("/populate",createGenres)
router.put("/update",updateGenres)

export default router;