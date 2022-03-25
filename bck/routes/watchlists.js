import { Router } from "express";
import {
  getWatchlist,
  createWatchlistEntry,
  updateWatchlistEntry,
  deleteWatchlistEntry
} from "../controllers/watchlists.js";
//import auth from "../middlewares/auth.mjs";

const router = Router();

router.get("/:id",getWatchlist);
router.post("/:id",createWatchlistEntry);
router.put("/:id",updateWatchlistEntry);
router.delete("/:id",deleteWatchlistEntry);
export default router;