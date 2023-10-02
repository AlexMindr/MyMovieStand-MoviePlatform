import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cors";
import dotenv from "dotenv";
import db from "./models/index.cjs";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/originCredentials.js";
import { logger } from "./middleware/logEvents.js";
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admins.js";
import authRoutes from "./routes/auth.js";
import genreRoutes from "./routes/genres.js";
import notificationRoutes from "./routes/notifications.js";
import watchlistRoutes from "./routes/watchlists.js";
import reviewsRoutes from "./routes/reviews.js";
import postsRoutes from "./routes/posts.js";
import recommendationsRoutes from "./routes/recommendations.js";

//initialize server
const app = express();

//security practice
app.disable("x-powered-by");

//initialize .env
dotenv.config();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// custom middleware log
//app.use(logger);

// Helmet
app.use(helmet());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middlewares for json and url data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

//app route routers
app.use("/movies", movieRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/genres", genreRoutes);
app.use("/notifications", notificationRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/posts", postsRoutes);
app.use("/recommendations", recommendationsRoutes);
app.use("/admin", adminRoutes);

app.all("*", (req, res, next) => {
  return res.status(404).json({ success: false, message: "Invalid route" });
});

app.use(function (err, req, res, next) {
  return res.status(500).json({ message: "An error has occured!" });
});

const PORT = process.env.PORT || 5001;
const { sequelize } = db;

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
startApp();
