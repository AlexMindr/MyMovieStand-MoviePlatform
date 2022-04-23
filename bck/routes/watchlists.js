import { Router } from "express";
import {
  getWatchlist,
  createWatchlistEntry,
  updateWatchlistEntry,
  deleteWatchlistEntry,
  getWatchlistInit
} from "../controllers/watchlists.js";
import auth from "../middleware/auth.js";

const router = Router();


router.get("/",auth,getWatchlistInit);
router.get("/all",auth,getWatchlist);
router.post("/",auth,createWatchlistEntry);
router.put("/",auth,updateWatchlistEntry);
router.delete("/",auth,deleteWatchlistEntry);
export default router;