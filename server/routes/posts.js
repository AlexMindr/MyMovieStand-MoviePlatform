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

router
  .get("/get/home", getHomePosts)
  .get("/get/movie=:movieid/page=:page/count=:count", getMoviePosts)
  .get("/get/post=:postid", getPostContent)
  .get("/get/news/home", getHomeNews)
  .get("/get/news/all/page=:page", getNews)
  .get("/get/comments/post=:postid/page=:page/count=:count", getPostComments)
  .get("/get/user=:username/page=:page/count=:count", getUserPosts)
  .get("/get/comments/user=:username/page=:page/count=:count", getUserComments);

router.use(auth);
router
  .post("/add", addPost)
  .post("/add/comment", addComment)
  .put("/delete/user", deletePost)
  .put("/delete/user/comment", deleteComm);

export default router;
