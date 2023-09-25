import dotenv from "dotenv";
dotenv.config();
const allowedOrigins = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  process.env.CLIENT_URL,
];
export default allowedOrigins;
