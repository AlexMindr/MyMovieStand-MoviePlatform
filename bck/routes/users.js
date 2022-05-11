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
 getSimpleProfile,
} from "../controllers/users.js";
import auth from '../middleware/auth.js'


const router = Router();

router.get("/verify", verifyToken);
router.get("/profile/:username",getProfile);
router.get("/myprofile",auth,getSimpleProfile);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update",auth,update);
router.put("/reset",resetPass);
router.put("/change",changePass);
router.delete("/delete/:id",deleteAdm)

export default router;