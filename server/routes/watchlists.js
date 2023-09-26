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
router.use(auth);

router
  .get("/get/init", getWatchlistInit)
  .get("/get/user=:username", getWatchlist)
  .get("/get/favourites", getFavourites)
  .get("/get/favourites/user=:username", getFavouritesProfile)
  .post("/post", createWatchlistEntry)
  .put("/update", updateWatchlistEntry)
  .put("/add/favourite", addFavourite)
  .put("/remove/favourite", removeFavourite)
  .delete("/delete/movie=:movieid", deleteWatchlistEntry);

export default router;
