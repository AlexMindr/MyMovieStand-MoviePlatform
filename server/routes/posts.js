import { Router } from "express";
import {
  addPost,
  addComment,
  getHomePosts,
  getMoviePosts,
  getUserPosts,
  getPostComments,
  getPostContent,
  getUserComments,
  deletePost,
  deleteComm,
  getHomeNews,
  getNews,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/get/home", getHomePosts);
router.get("/get/movie/:movieid/page=:page/count=:count", getMoviePosts);
router.get("/get/post/:postid/", getPostContent);
router.get("/get/news/home", getHomeNews);
router.get("/get/news/all/page=:page", getNews);
router.get(
  "/get/post/:postid/comments/page=:page/count=:count",
  getPostComments
);

router.use(auth);
router
  .get("/get/posts/user=:username/page=:page/count=:count", getUserPosts)
  .get("/get/comments/user=:username/page=:page/count=:count", getUserComments)
  .post("/add/post", addPost)
  .post("/add/comment", addComment)
  .put("/user/post/delete", deletePost)
  .put("/user/comm/delete", deleteComm);

export default router;
