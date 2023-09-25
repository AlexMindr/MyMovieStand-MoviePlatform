import { Router } from "express";
import { getGenres } from "../controllers/genres.js";

const router = Router();

router.get("/get", getGenres);

export default router;
