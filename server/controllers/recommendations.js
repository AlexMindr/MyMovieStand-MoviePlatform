import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { Watchlist, Movie, User, sequelize, Sequelize } = db;

const getUserRecommendations = async (req, res) => {
  try {
    const userid = req.userId;

    const watchlist = await Watchlist.findAll({
      attributes: [
        // 'movieid','rating'
      ],
      include: [
        {
          model: Movie,
          attributes: ["title"],
        },
      ],
      where: {
        userid: userid,
        rating: { [Op.gte]: 6 },
      },
    });
    const moviesPredicted = [];
    if (watchlist.length > 0) {
      const recommendations = [];
      for (let i = 0; i <= 4; i++) {
        const randomElement =
          watchlist[Math.floor(Math.random() * watchlist.length)];

        const res = await axios.post(
          `http://127.0.0.1:5002/predict-soup?Title=${encodeURIComponent(
            randomElement.Movie.title
          )}`
        );
        const predictions = res.data.filter(
          (item) => watchlist.some((wl) => wl.Movie.title === item) === false
        );
        const randomRes =
          predictions[Math.floor(Math.random() * predictions.length)];

        recommendations.push(randomRes);
      }

      for (let i = 0; i <= 4; i++) {
        const movie = await Movie.findOne({
          attributes: ["movieid", "title", "poster_path"],
          where: {
            title: recommendations[i],
          },
        });
        moviesPredicted.push(movie);
      }
    }
    return res.status(200).json({ moviesPredicted });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getMovieRecommendations = async (req, res) => {
  try {
    const { movieid } = req.params;
    const { title } = await Movie.findOne({
      attributes: ["title"],
      where: {
        movieid,
      },
    });

    const moviesPredicted = [];
    if (title) {
      const recommendations = [];
      const res = await axios.post(
        `http://127.0.0.1:5002/predict-overview?Title=${encodeURIComponent(
          title
        )}`
      );
      const predictions = res.data;
      for (let i = 0; i <= 4; i++) {
        let randomRes =
          predictions[Math.floor(Math.random() * predictions.length)];
        if (recommendations.find((el) => el === randomRes)) {
          randomRes =
            predictions[Math.floor(Math.random() * predictions.length)];
        }
        recommendations.push(randomRes);
      }
      for (let i = 0; i <= 4; i++) {
        const movie = await Movie.findOne({
          attributes: ["movieid", "title", "poster_path"],
          where: {
            title: recommendations[i],
          },
        });
        moviesPredicted.push(movie);
      }
    }
    return res.status(200).json(moviesPredicted);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { getUserRecommendations, getMovieRecommendations };
