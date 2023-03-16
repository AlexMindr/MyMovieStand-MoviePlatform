import { Router } from "express";
import {
  addPost,
  addComment,
  //updatePost,
  getHomePosts,
  getMoviePosts,
  getUserPosts,
  getPostComments,
  getPostContent,
  getUserComments,
  deletePostUser,
  restrictPost,
  restrictComm,
  deletePost,
  deleteComm,
  deleteCommUser,
  addNews,
  getHomeNews,
  getNews,
  updateNews
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();

router.post("/add/post", auth, addPost);
router.post("/add/comment", auth, addComment);
router.get("/get/home", getHomePosts);
router.get("/get/movie/:movieid/page=:page/count=:count", getMoviePosts);
router.get("/get/post/:postid/", getPostContent);
router.get("/get/news/home", getHomeNews);
router.get("/get/news/all/page=:page", getNews);
router.get(
  "/get/post/:postid/comments/page=:page/count=:count",
  getPostComments
);
router.get(
  "/get/posts/user/:username/page=:page/count=:count",
  auth,
  getUserPosts
);
router.get(
  "/get/comments/user/:username/page=:page/count=:count",
  auth,
  getUserComments
);

router.put("/user/post/delete", auth, deletePostUser);
router.put("/user/comm/delete", auth, deleteCommUser);

//router.put("/update",authAdmin,updatePost);
router.put("/admin/post/restrict", authAdmin, restrictPost);
router.delete("/admin/post/delete/:postid", authAdmin, deletePost);
router.put("/admin/comm/restrict", authAdmin, restrictComm);
router.delete("/admin/comm/delete/:ucid", authAdmin, deleteComm);
router.post("/admin/news/add", authAdmin, addNews);
router.put("/admin/news/edit", authAdmin, updateNews);


export default router;
