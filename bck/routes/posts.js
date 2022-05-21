import { Router } from "express";
import { 
 addPost,
 deletePost,
 //getHomePosts,
 updatePost
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addPost);
//router.get("/get", auth,geHomePosts);
router.delete("/delete",auth,deletePost);
router.put("/update",auth,updatePost);

export default router;