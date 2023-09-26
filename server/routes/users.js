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

router.get("/get/profile/user=:username", getProfile);
// .put("/reset/password", resetPass)
// .put("/change/password", changePass);

router.use(auth);
router
  .get("/get/init/profile", getSimpleProfile) //
  .put("/update/profile", update);

export default router;
