import { Router } from "express";
import { 
 signup,
 login,
 update,
 resetPass,
 changePass,
 deleteAdm,
 verifyToken,
 getProfile,
} from "../controllers/users.js";

const router = Router();

router.get("/verify", verifyToken);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update",update);
router.put("/reset",resetPass);
router.put("/change",changePass);
router.delete("/delete/:id",deleteAdm)
router.get("/profile/:username",getProfile);
export default router;