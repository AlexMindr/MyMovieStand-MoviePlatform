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
  .get("/", getWatchlistInit)
  .get("/:username", getWatchlist)
  .get("/fav/myfavourites", getFavourites)
  .get("/fav/u/:username", getFavouritesProfile)
  .post("/", createWatchlistEntry)
  .put("/", updateWatchlistEntry)
  .put("/addfav", addFavourite)
  .put("/remfav", removeFavourite)
  .delete("/delete/:movieid", deleteWatchlistEntry);

export default router;
