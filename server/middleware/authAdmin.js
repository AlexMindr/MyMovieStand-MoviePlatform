import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models/index.cjs";

const { User } = db;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer "))
      res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid Token" }); //invalid token
      const userId = decoded?.useruuid;
      const user = await User.findOne({
        where: { useruuid: userId, role: "admin" },
      });
      if (user) {
        req.userId = userId;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default authAdmin;
