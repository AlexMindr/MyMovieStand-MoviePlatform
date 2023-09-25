import { Router } from "express";
import {
  update,
  resetPass,
  changePass,
  getProfile,
  getSimpleProfile,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = Router();

router
  .get("/profile/:username", getProfile)
  .put("/reset", resetPass)
  .put("/change", changePass);

router.use(auth);
router
  .get("/myprofile", getSimpleProfile) //
  .put("/update", update);

export default router;
