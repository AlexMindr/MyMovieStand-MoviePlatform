import { Router } from "express";
import {
  getWatchlist,
  getWatchlistInit,
  getFavourites,
  getFavouritesProfile,
  createWatchlistEntry,
  updateWatchlistEntry,
  addFavourite,
  removeFavourite,
  deleteWatchlistEntry,
} from "../controllers/watchlists.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getWatchlistInit);
router.get("/:username", getWatchlist);
router.get("/fav/myfavourites", auth, getFavourites);
router.get("/fav/u/:username", getFavouritesProfile);
router.post("/", auth, createWatchlistEntry);
router.put("/", auth, updateWatchlistEntry);
router.put("/addfav", auth, addFavourite);
router.put("/remfav", auth, removeFavourite);
router.delete("/delete/:movieid", auth, deleteWatchlistEntry);

export default router;
