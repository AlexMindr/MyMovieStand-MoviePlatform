import { Router } from "express";
import {
  deleteNotif,
  updateNotif,
  addNotif,
  getNotif,
  getNotifPag,
} from "../controllers/notifications.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);
router
  .get("/get", getNotif)
  .get("/get/page=:page", getNotifPag)
  .post("/add", addNotif)
  .put("/update", updateNotif)
  .delete("/delete/:notificationid", deleteNotif);

export default router;
