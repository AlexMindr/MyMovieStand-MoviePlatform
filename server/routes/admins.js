import { Router } from "express";
import {
  deleteUser,
  addGlobalNotif,
  addNotif,
  createGenres,
  updateGenres,
  restrictReview,
  deleteReview,
} from "../controllers/admin.js";
import {
  populateMovies,
  createMovie,
  updatePopularityAndRating,
  updateMovie,
} from "../controllers/adminMovies.js";
import {
  addNews,
  restrictComm,
  updateNews,
  restrictPost,
  deleteComm,
  deletePost,
} from "../controllers/adminPosts.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.use(authAdmin);
router
  .post("/news/add", addNews)
  .post("/notifications/add/single", addNotif)
  .post("/notifications/add/global", addGlobalNotif)
  .post("/movies/populate", populateMovies)
  .post("/movies/create", createMovie)
  .post("/genres/populate", createGenres)
  .put("/movies/update/movie", updateMovie)
  .put("/movies/update/popularity", updatePopularityAndRating)
  .put("/genres/update", updateGenres)
  .put("/posts/restrict", restrictPost)
  .put("/comments/restrict", restrictComm)
  .put("/news/edit", updateNews)
  .put("/reviews/restrict", restrictReview)
  .delete("/posts/delete/:postid", deletePost)
  .delete("/comments/delete/:ucid", deleteComm)
  .delete("/reviews/delete/:reviewid", deleteReview)
  .delete("/users/delete/:username", deleteUser);

export default router;
