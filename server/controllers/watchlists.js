import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import dotenv from "dotenv";
import { getUserIdFromUsername } from "../utils/getUserIdFromUsername.js";

dotenv.config();
const { Watchlist, User, Movie } = db;

const getWatchlistInit = async (req, res) => {
  try {
    const userid = req.userId;

    const watchlist = await Watchlist.findAll({
      attributes: ["status", "rating", "movieid", "favourite"],
      where: {
        userid,
      },
    });

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const { username } = req.params;

    const userid = await getUserIdFromUsername(username);
    if (!userid) res.status(404).json({ message: "User doesn't exist" });

    const watchlist = await Watchlist.findAll({
      attributes: ["status", "rating", "movieid"],
      where: {
        userid,
      },
      include: {
        model: Movie,
        attributes: ["title", "release_date", "poster_path", "uscertification"],
      },
      order: [
        [Movie, "title", "ASC"],
        ["rating", "DESC"],
      ],
    });

    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createWatchlistEntry = async (req, res) => {
  try {
    const userid = req.userId;
    const { status, rating, movieid } = req.body;

    await Watchlist.create({
      userid,
      movieid,
      status,
      rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateWatchlistEntry = async (req, res) => {
  try {
    const userid = req.userId;
    const { status, rating, movieid } = req.body;

    await Watchlist.update(
      {
        status,
        rating,
        updatedAt: new Date(),
      },
      {
        where: {
          userid,
          movieid,
        },
      }
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteWatchlistEntry = async (req, res) => {
  try {
    const userid = req.userId;
    const { movieid } = req.params;

    await Watchlist.destroy({
      where: {
        userid,
        movieid,
      },
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addFavourite = async (req, res) => {
  try {
    const userid = req.userId;
    const { movieid } = req.body;

    const countFav = await Watchlist.count({
      attributes: ["favourite"],
      where: {
        userid,
        favourite: true,
      },
    });
    if (countFav >= 6)
      res
        .status(403)
        .json({ message: "You cannot have more than 6 favourite movies!" });

    await Watchlist.update(
      {
        favourite: true,
        updatedAt: new Date(),
      },
      {
        where: {
          userid,
          movieid,
        },
      }
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removeFavourite = async (req, res) => {
  try {
    const userid = req.userId;
    const { movieid } = req.body;

    await Watchlist.update(
      {
        favourite: false,
        updatedAt: new Date(),
      },
      {
        where: {
          userid,
          movieid,
        },
      }
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getFavouritesProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const userid = await getUserIdFromUsername(username);
    if (!userid) res.status(404).json({ message: "User doesn't exist" });

    const favourites = await Watchlist.findAll({
      attributes: ["status", "rating", "movieid", "favourite"],
      where: {
        userid,
        favourite: true,
      },
      include: {
        model: Movie,
        attributes: ["title", "poster_path"],
      },
      order: [
        ["rating", "DESC"],
        [Movie, "title", "ASC"],
      ],
    });

    res.status(200).json({ favourites });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getFavourites = async (req, res) => {
  try {
    const userid = req.userId;

    const watchlist = await Watchlist.findAll({
      attributes: ["status", "rating", "movieid", "favourite"],
      where: {
        userid,
        status: { [Op.or]: ["Completed", "Watching", "On-hold"] },
        favourite: false,
      },
      include: {
        model: Movie,
        attributes: ["title", "poster_path"],
      },
      order: [
        ["rating", "DESC"],
        [Movie, "title", "ASC"],
      ],
    });

    const favourites = await Watchlist.findAll({
      attributes: ["status", "rating", "movieid", "favourite"],

      where: {
        userid,
        favourite: true,
      },
      include: {
        model: Movie,
        attributes: ["title", "poster_path"],
      },
      order: [
        ["rating", "DESC"],
        [Movie, "title", "ASC"],
      ],
    });

    res.status(200).json({ favourites, watchlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  getWatchlist,
  createWatchlistEntry,
  updateWatchlistEntry,
  deleteWatchlistEntry,
  getWatchlistInit,
  addFavourite,
  removeFavourite,
  getFavourites,
  getFavouritesProfile,
};
