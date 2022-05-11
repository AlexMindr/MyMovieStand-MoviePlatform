import { Router } from "express";
import {
  getWatchlist,
  createWatchlistEntry,
  updateWatchlistEntry,
  deleteWatchlistEntry,
  getWatchlistInit,
  addFavourite,
  removeFavourite,
} from "../controllers/watchlists.js";
import auth from "../middleware/auth.js";

const router = Router();


router.get("/",auth,getWatchlistInit);
router.get("/:username",getWatchlist);
router.post("/",auth,createWatchlistEntry);
router.put("/",auth,updateWatchlistEntry);
router.put("/addfav",auth,addFavourite);
router.put("/remfav",auth,removeFavourite);
router.delete("/",auth,deleteWatchlistEntry);
export default router;