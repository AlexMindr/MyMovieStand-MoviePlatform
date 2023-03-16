import { Router } from "express";
import {
  getGenres,
  createGenres,
  updateGenres,
} from "../controllers/genres.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.get("/get", getGenres);
router.post("/populate", authAdmin, createGenres);
router.put("/update", authAdmin, updateGenres);

export default router;
