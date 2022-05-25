import { Router } from "express";
import { 
 addPost,
 deletePost,
 updatePost,
 getHomePosts,
 getMoviePosts,
 getUserPosts,
 getPostComments,
 getPostContent,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addPost);
//router.get("/get", auth,geHomePosts);
//router.get("/get/:movieid",auth,getReview);
router.get("/get/movie/:movieid/page=:page/count=:count",getMoviePosts);
router.get("/get/post/:postid/",getPostContent);
router.get("/get/post/:postid/comments/page=:page/count=:count",getPostComments);
//router.get("/get/user/:username/page=:page/count=:count",auth,getUserPosts);
router.delete("/delete",auth,deletePost);
router.put("/update",auth,updatePost);

export default router;