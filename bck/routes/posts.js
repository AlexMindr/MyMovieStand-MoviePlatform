import { Router } from "express";
import { 
 addPost,
 deletePost,
 getPost,
 updatePost
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addPost);
router.get("/get", auth,getPost);
router.delete("/delete",auth,deletePost);
router.put("/update",auth,updatePost);

export default router;