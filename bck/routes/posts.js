import { Router } from "express";
import { 
 addPost,
 addComment,
 deletePost,
 updatePost,
 getHomePosts,
 getMoviePosts,
 getUserPosts,
 getPostComments,
 getPostContent,
 getUserComments
 
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add/post",auth, addPost);
router.post("/add/comment",auth, addComment);
//router.get("/get", auth,geHomePosts);
router.get("/get/home",getHomePosts);
router.get("/get/movie/:movieid/page=:page/count=:count",getMoviePosts);
router.get("/get/post/:postid/",getPostContent);
router.get("/get/post/:postid/comments/page=:page/count=:count",getPostComments);
router.get("/get/posts/user/:username/page=:page/count=:count",auth,getUserPosts);
router.get("/get/comments/user/:username/page=:page/count=:count",auth,getUserComments);
router.delete("/delete",auth,deletePost);
router.put("/update",auth,updatePost);

export default router;