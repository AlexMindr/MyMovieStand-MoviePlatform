import { Router } from "express";
import { signup, login, verifyToken } from "../controllers/auth.js";

const router = Router();

router
  .post("/signup", signup)
  .post("/login", login)
  .post("/verify", verifyToken);

export default router;
