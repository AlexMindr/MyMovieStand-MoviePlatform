import { Router } from "express";
import { 
 deleteSelected,
 addNotifAdmin,
 addGlobalNotifAdmin,
 updateNotif,
 getNotif
} from "../controllers/notifications.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();


router.get("/get", auth,getNotif);
router.delete("/delete",auth,deleteSelected);
router.put("/update",auth,updateNotif);

router.post("/add",authAdmin, addNotifAdmin);
router.post("/add/global",authAdmin, addGlobalNotifAdmin);

export default router;