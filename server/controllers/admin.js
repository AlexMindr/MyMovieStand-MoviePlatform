import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import dotenv from "dotenv";
dotenv.config();
const { Genre, Review, User, sequelize, Sequelize, Notification } = db;
const apiKey = process.env.APIKEY;

//user Admin--------------------------------
const deleteUser = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { username } = req.params;

      const success = await User.destroy({
        where: {
          username,
          role: { [Op.ne]: "admin" },
        },
      });

      if (success === 0) {
        res.status(403).json({ message: "User doesn't exist or is an admin" });
      } else {
        res.status(201).json({ message: "Success" });
      }
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//genres Admin-------------------------------
const createGenres = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      let genres = resp.data.genres;
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
      res.status(201).json("Success");
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateGenres = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );

      let genres = resp.data.genres;

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
      res.status(201).json("Success");
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//notifications Admin
const addNotif = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { content, username } = req.body;

      const { userid } = await User.findOne({
        attributes: ["userid"],
        where: { username },
      });
      const newNotif = await Notification.create({
        userid,
        content,
        read: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({ message: "Success" });
    } else {
      res
        .status(404)
        .json({ message: "Something went wrong/User doesn't exist!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGlobalNotif = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
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

      res.status(201).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

//reviews Admin
const deleteReview = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { reviewid } = req.params;

      const success = await Review.destroy({
        where: {
          reviewid,
        },
      });

      if (success === 0) {
        res.status(403).json({ message: "Review doesn't exist" });
      } else {
        res.status(201).json({ message: "Success" });
      }
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const restrictReview = async (req, res) => {
  const restrictAdmin = {
    blocks: [
      {
        key: "9m832",
        text: "  Review removed by admin",
        type: "blockquote",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 25,
            style: "color-rgb(226,80,65)",
          },
          {
            offset: 0,
            length: 25,
            style: "bgcolor-rgb(239,239,239)",
          },
          {
            offset: 0,
            length: 25,
            style: "ITALIC",
          },
          {
            offset: 0,
            length: 25,
            style: "fontsize-18",
          },
        ],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };

  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { reviewid } = req.body;

      const success = await Review.update(
        {
          content: restrictAdmin,
          updatedAt: new Date(),
        },
        {
          where: {
            reviewid,
          },
        }
      );

      if (success === 0) {
        res.status(403).json({ message: "Review doesn't exist" });
      } else {
        res.status(201).json({ message: "Success" });
      }
    } else {
      res.status(404).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
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
