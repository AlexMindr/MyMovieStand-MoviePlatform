import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from './models/index.cjs';
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";
import genreRoutes from "./routes/genres.js";
import notificationRoutes from "./routes/notifications.js";
import watchlistRoutes from "./routes/watchlists.js"

const {sequelize}= db;

const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));

app.use("/movies", movieRoutes);
app.use("/user", userRoutes);
app.use("/genres", genreRoutes);
app.use("/notifications", notificationRoutes);
app.use("/watchlist", watchlistRoutes);


app.all('*', (req,res,next)=>{
  return res.status(404).json({success:false, message:"Invalid route"});
});

app.use(function(err,req,res,next){
  return res.status(500).json(err);
});

const PORT = process.env.PORT || 5001;
const startApp = async () => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => console.log(`Server running on port:${PORT}`));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
startApp();


