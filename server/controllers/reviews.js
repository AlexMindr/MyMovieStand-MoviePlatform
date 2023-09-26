import db from "../models/index.cjs";
import { Op } from "@sequelize/core";
import dotenv from "dotenv";
import { getPagination, getPagingDataGroup } from "../utils/getPagination.js";
import { getUserIdFromUsername } from "../utils/getUserIdFromUsername.js";

dotenv.config();
const { Movie, Review, UserLike, User, sequelize, Sequelize } = db;

const getHomeReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      limit: 3,
      subQuery: false,
      attributes: [
        "movieid",
        "content",
        "createdAt",
        "updatedAt",
        "reviewid",
        [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"],
      ],
      distinct: true,
      include: [
        {
          model: User,
          attributes: ["username", "fullname", "firstName", "lastName"],
        },
        {
          model: UserLike,
          required: false,
          attributes: [],
          where: {
            liked: { [Op.eq]: true },
          },
        },
        {
          model: Movie,
          required: true,
          attributes: ["movieid", "title"],
        },
      ],
      group: ["reviewid"],
      order: [[sequelize.literal("likeCount"), "DESC"]],
    });
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMovieReviews = async (req, res) => {
  try {
    const { page, count } = req.params;
    const { limit, offset } = getPagination(page - 1, count);
    const { movieid } = req.params;

    await Review.findAndCountAll({
      subQuery: false,
      attributes: [
        "movieid",
        "content",
        "createdAt",
        "updatedAt",
        "reviewid",
        [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"],
      ],
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: User,
          attributes: ["username", "fullname", "firstName", "lastName"],
        },
        {
          model: UserLike,
          required: false,
          attributes: [],
          where: {
            liked: { [Op.eq]: true },
          },
        },
      ],
      where: { movieid },
      group: ["reviewid"],
      order: [[sequelize.literal("likeCount"), "DESC"]],
    })
      .then((data) => {
        const { rows: reviews, totalPages } = getPagingDataGroup(
          data,
          page,
          limit
        );
        res.status(200).json({ reviews, totalPages });
      })
      .catch((error) => {
        res.status(404).json({ message: "Not found" });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserReviewsAndLikes = async (req, res) => {
  try {
    const userid = req.userId;
    const reviews = await Review.findAll({
      attributes: ["movieid"],
      where: { userid },
    });
    const likes = await UserLike.findAll({
      attributes: ["reviewid", "liked"],
      where: { userid },
    });
    res.status(200).json({ reviews, likes });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getReview = async (req, res) => {
  try {
    const userid = req.userId;
    const { movieid } = req.params;
    const review = await Review.findOne({
      attributes: ["movieid", "content"],
      where: { userid, movieid },
    });
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getLikesForReview = async (req, res) => {
  try {
    const { reviewid } = req.params;
    const likes = await UserLike.count({
      attributes: ["liked"],
      where: {
        reviewid,
        liked: true,
      },
    });
    const dislikes = await UserLike.count({
      attributes: ["liked"],
      where: {
        reviewid,
        liked: false,
      },
    });
    res.status(200).json({ likes, dislikes });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { username, page, count } = req.params;
    const { limit, offset } = getPagination(page - 1, count);

    const userid = await getUserIdFromUsername(username);
    if (!userid) res.status(404).json({ message: "User doesn't exist" });

    await Review.findAndCountAll({
      subQuery: false,
      attributes: [
        "movieid",
        "content",
        "createdAt",
        "updatedAt",
        "reviewid",
        [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"],
      ],
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: User,
          attributes: ["username", "fullname", "firstName", "lastName"],
        },
        {
          model: UserLike,
          required: false,
          attributes: [],
          where: {
            liked: { [Op.eq]: true },
          },
        },
        {
          model: Movie,
          attributes: ["title"],
        },
      ],
      where: { userid },
      group: ["reviewid"],
      order: [[sequelize.literal("likeCount"), "DESC"]],
    })
      .then((data) => {
        const { rows: reviews, totalPages } = getPagingDataGroup(
          data,
          page,
          limit
        );

        res.status(200).json({ reviews, totalPages });
      })
      .catch((error) => {
        res.status(404).json({ message: "Not Found" });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addReview = async (req, res) => {
  try {
    const { content, movieid } = req.body;
    const userid = req.userId;
    await Review.create({
      userid,
      movieid,
      content,
      //:JSON.stringify(content)
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { movieid } = req.params;
    const userid = req.userId;

    await Review.destroy({
      where: {
        movieid,
        userid,
      },
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { movieid, content } = req.body;
    const userid = req.userId;
    await Review.update(
      {
        content,
        //:JSON.stringify(content),
        updatedAt: new Date(),
      },
      {
        where: {
          movieid,
          userid,
        },
      }
    );

    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const likeReview = async (req, res) => {
  try {
    const { reviewid } = req.body;
    const userid = req.userId;
    const current = await UserLike.findOne({ where: { userid, reviewid } });
    if (current) {
      await UserLike.update(
        {
          liked: true,
          updatedAt: new Date(),
        },
        {
          where: {
            reviewid,
            userid,
          },
        }
      );
    } else {
      await UserLike.create({
        liked: true,
        reviewid,
        userid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const dislikeReview = async (req, res) => {
  try {
    const { reviewid } = req.body;
    const userid = req.userId;
    const current = await UserLike.findOne({ where: { userid, reviewid } });
    if (current) {
      await UserLike.update(
        {
          liked: false,
          updatedAt: new Date(),
        },
        {
          where: {
            reviewid,
            userid,
          },
        }
      );
    } else {
      await UserLike.create({
        liked: false,
        reviewid,
        userid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  getHomeReviews,
  getMovieReviews,
  getUserReviews,
  addReview,
  updateReview,
  getUserReviewsAndLikes,
  getReview,
  likeReview,
  dislikeReview,
  getLikesForReview,
  deleteReview,
};
