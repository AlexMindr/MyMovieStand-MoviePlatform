import { Router } from "express";
import { 
 addNotif,
 deleteSelected,
 getNotif,
 updateNotif
} from "../controllers/notifications.js";

const router = Router();

router.post("/add", addNotif);
router.get("/get", getNotif);
router.delete("/delete",deleteSelected);
router.put("/update",updateNotif);

export default router;