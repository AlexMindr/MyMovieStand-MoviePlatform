import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    res.status(401).json({ message: "Login in order to continue" });

  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid Token" }); //invalid token
      req.userId = decoded?.useruuid;
      next();
    });
  } else res.status(403).json({ message: "Invalid token" });
};

export default auth;
