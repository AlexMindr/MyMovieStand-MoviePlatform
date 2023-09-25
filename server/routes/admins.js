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
  .post("/admin/news/add", addNews)
  .post("/add/single", addNotif)
  .post("/add/global", addGlobalNotif)
  .post("/populate", populateMovies)
  .post("/create", createMovie)
  .post("/populate", createGenres)
  .put("/update", updateMovie)
  .put("/update/popularity/all", updatePopularityAndRating)
  .put("/update", updateGenres)
  .put("/admin/post/restrict", restrictPost)
  .put("/admin/comm/restrict", restrictComm)
  .put("/admin/news/edit", updateNews)
  .put("/admin/restrict", restrictReview)
  .delete("/admin/post/delete/:postid", deletePost)
  .delete("/admin/comm/delete/:ucid", deleteComm)
  .delete("/admin/delete/:reviewid", deleteReview)
  .delete("/delete/:username", deleteUser);

export default router;
