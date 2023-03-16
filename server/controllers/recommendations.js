import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import axios from "axios";
const { Watchlist, Movie, User, sequelize, Sequelize } = db;

const getUserRecommendations = async (req, res) => {
  try {
    const useruuid = req.userId;
    const { userid } = await User.findOne({ where: { useruuid } });

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
    let moviesPredicted = [];
    if (watchlist.length > 0) {
      let recommendations = [];
      for (let i = 1; i <= 5; i++) {
        let randomElement =
          watchlist[Math.floor(Math.random() * watchlist.length)];
        const res = await axios.post(
          `http://127.0.0.1:5002/predict-soup?Title=${randomElement.Movie.title}`
        );
        let predictions = res.data;
        
        predictions=predictions.filter((item)=>watchlist.some(wl=>wl.Movie.title===item)===false)
        console.log(predictions)
        let randomRes =
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
    res.status(200).json(moviesPredicted);
  } catch (error) {
    res.status(404).json({ message: error.message });
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

    let moviesPredicted = [];
    if (title) {
      let recommendations = [];
      const res = await axios.post(
        `http://127.0.0.1:5002/predict-overview?Title=${title}`
      );
      let predictions = res.data; 
      for (let i = 1; i <= 5; i++) {
        
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
    res.status(200).json(moviesPredicted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getUserRecommendations, getMovieRecommendations };
