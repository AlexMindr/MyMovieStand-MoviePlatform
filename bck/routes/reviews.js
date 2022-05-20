import { Router } from "express";
import { 
 addReview,
 deleteReview,
 getReview,
 updateReview
} from "../controllers/reviews.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addReview);
router.get("/get", auth,getReview);
router.delete("/delete",auth,deleteReview);
router.put("/update",auth,updateReview);

export default router;