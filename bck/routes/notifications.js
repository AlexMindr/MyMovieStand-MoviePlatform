import { Router } from "express";
import { 
 deleteNotif,
 addNotifAdmin,
 addGlobalNotifAdmin,
 updateNotif,
 getNotif,
 addNotif,
 getNotifPag
} from "../controllers/notifications.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = Router();


router.post("/add", auth,addNotif);
router.get("/get", auth,getNotif);
router.get("/get/page=:page", auth,getNotifPag);

router.delete("/delete/:notificationid",auth,deleteNotif);
router.put("/update",auth,updateNotif);

router.post("/add",authAdmin, addNotifAdmin);
router.post("/add/global",authAdmin, addGlobalNotifAdmin);

export default router;