import { Router } from "express";
import { 
 signup,
 login,
 update,
 resetPass,
 changePass,
 deleteAdm 
} from "../controllers/users.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update",update);
router.put("/reset",resetPass);
router.put("/change",changePass);
router.delete("/delete/:id",deleteAdm)
export default router;