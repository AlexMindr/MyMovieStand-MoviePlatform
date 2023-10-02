import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import dotenv from "dotenv";
import { RestrictAdminReviewMessage } from "../utils/messagesRestrictDelete.js";

dotenv.config();
const { Genre, Review, User, Notification } = db;
const apiKey = process.env.APIKEY;

//user Admin--------------------------------
const deleteUser = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { username } = req.params;

      const success = await User.destroy({
        where: {
          username,
          role: { [Op.ne]: "admin" },
        },
      });

      if (success === 0) {
        return res
          .status(403)
          .json({ message: "User doesn't exist or is an admin" });
      } else {
        return res.status(201).json({ message: "Success" });
      }
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//genres Admin-------------------------------
const createGenres = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const genres = response.data.genres;
      genres.map(async (genre) => {
        await Genre.bulkCreate([
          {
            genreid: genre.id,
            name: genre.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
      return res.status(201).json({ message: "Success" });
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateGenres = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      const genres = response.data.genres;
      genres.map(async (genre) => {
        await Genre.update(
          {
            name: genre.name,
            updatedAt: new Date(),
          },
          {
            where: {
              genreid: genre.id,
            },
          }
        );
      });
      return res.status(201).json({ message: "Success" });
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//notifications Admin
const addNotif = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { content, username } = req.body;

      const { userid } = await User.findOne({
        attributes: ["userid"],
        where: { username },
      });
      await Notification.create({
        userid,
        content,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({ message: "Success" });
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addGlobalNotif = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { content } = req.body;
      const userids = await User.findAll({ attributes: ["userid"] });
      userids.map(async (user) => {
        await Notification.create({
          userid: user.userid,
          content,
          read: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      return res.status(201).json({ message: "Success" });
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//reviews Admin
const deleteReview = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { reviewid } = req.params;

      const success = await Review.destroy({
        where: {
          reviewid,
        },
      });

      if (success === 0) {
        return res.status(404).json({ message: "Review doesn't exist" });
      } else {
        return res.status(201).json({ message: "Success" });
      }
    } else {
      return res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const restrictReview = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { reviewid } = req.body;

      const success = await Review.update(
        {
          content: RestrictAdminReviewMessage,
          updatedAt: new Date(),
        },
        {
          where: {
            reviewid,
          },
        }
      );

      if (success === 0) {
        return res.status(404).json({ message: "Review doesn't exist" });
      } else {
        return res.status(201).json({ message: "Success" });
      }
    } else {
      return res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  deleteUser,
  updateGenres,
  createGenres,
  addGlobalNotif,
  addNotif,
  deleteReview,
  restrictReview,
};
