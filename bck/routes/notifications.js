import { Router } from "express";
import { 
 addNotif,
 deleteSelected,
 getNotif,
 updateNotif
} from "../controllers/notifications.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add",auth, addNotif);
router.get("/get", auth,getNotif);
router.delete("/delete",auth,deleteSelected);
router.put("/update",auth,updateNotif);

export default router;