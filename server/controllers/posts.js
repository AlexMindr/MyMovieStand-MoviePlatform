import db from "../models/index.cjs";
import dotenv from "dotenv";
import {
  getPagination,
  getPagingDataGroup,
  getPagingData,
} from "../utils/getPagination.js";
import { getUserIdFromUsername } from "../utils/getUserIdFromUsername.js";
import {
  RestrictUserCommentMessage,
  RestrictUserPostMessage,
} from "../utils/messagesRestrictDelete.js";

dotenv.config();
const { Movie, Post, UserComment, User, Sequelize } = db;

const getHomeNews = async (req, res) => {
  try {
    const posts = await Post.findAll({
      subQuery: false,
      attributes: [
        "movieid",
        "createdAt",
        "title",
        "postid",
        [
          Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")),
          "commentCount",
        ],
      ],
      limit: 5,
      distinct: true,
      include: [
        {
          model: Movie,
          attributes: ["title"],
        },
        {
          model: UserComment,
          required: false,
          attributes: [],
        },
      ],
      where: { post_type: "news" },
      group: ["postid"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const getHomePosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      subQuery: false,
      attributes: [
        "movieid",
        "createdAt",
        "title",
        "postid",
        [
          Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")),
          "commentCount",
        ],
      ],
      limit: 5,
      distinct: true,
      include: [
        {
          model: User,
          attributes: ["username", "fullname", "firstName", "lastName"],
        },
        {
          model: UserComment,
          required: false,
          attributes: [],
        },
      ],
      where: { post_type: "post" },
      group: ["postid"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const getNews = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1, 15);

  await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      "movieid",
      "createdAt",
      "title",
      "postid",
      [
        Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")),
        "commentCount",
      ],
    ],
    limit,
    offset,
    distinct: true,
    include: [
      {
        model: Movie,
        attributes: ["title"],
      },
      {
        model: UserComment,
        required: false,
        attributes: [],
      },
    ],
    where: { post_type: "news" },
    group: ["postid"],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { rows: posts, totalPages } = getPagingDataGroup(data, page, limit);

      res.status(200).json({ posts, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getMoviePosts = async (req, res) => {
  const { page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);

  const { movieid } = req.params;
  await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      "movieid",
      "createdAt",
      "title",
      "postid",
      [
        Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")),
        "commentCount",
      ],
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
        model: UserComment,
        required: false,
        attributes: [],
      },
    ],

    where: { movieid, post_type: "post" },
    group: ["postid"],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { rows: posts, totalPages } = getPagingDataGroup(data, page, limit);
      res.status(200).json({ posts, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getPostContent = async (req, res) => {
  try {
    const { postid } = req.params;
    const post = await Post.findOne({
      attributes: ["movieid", "content", "createdAt", "title", "postid"],
      include: [
        {
          model: User,
          attributes: ["username", "fullname", "firstName", "lastName"],
        },
      ],
      where: { postid },
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const getPostComments = async (req, res) => {
  const { page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);
  const { postid } = req.params;
  await UserComment.findAndCountAll({
    attributes: ["comment_content", "ucid", "createdAt"],
    limit,
    offset,
    distinct: true,
    include: [
      {
        model: User,
        attributes: ["username", "fullname", "firstName", "lastName"],
      },
    ],
    where: { postid },
    order: [["createdAt", "ASC"]],
  })
    .then((data) => {
      const { rows: comments, totalPages } = getPagingData(data, page, limit);
      res.status(200).json({ comments, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getUserPosts = async (req, res) => {
  const { username, page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);

  const userid = await getUserIdFromUsername(username);
  if (!userid) res.status(404).json({ message: "Not found" });

  await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      "movieid",
      "createdAt",
      "title",
      "postid",
      [
        Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")),
        "commentCount",
      ],
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
        model: UserComment,
        required: false,
        attributes: [],
      },
      {
        model: Movie,
        attributes: ["title"],
      },
    ],

    where: { userid, post_type: "post" },
    group: ["postid"],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { rows: posts, totalPages } = getPagingDataGroup(data, page, limit);

      res.status(200).json({ posts, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getUserComments = async (req, res) => {
  const { username, page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);

  const userid = await getUserIdFromUsername(username);
  if (!userid) res.status(404).json({ message: "Not found" });

  await UserComment.findAndCountAll({
    subQuery: false,
    attributes: ["comment_content", "ucid", "createdAt"],
    limit,
    offset,
    distinct: true,
    include: [
      {
        model: User,
        attributes: ["username", "fullname", "firstName", "lastName"],
      },
      {
        model: Post,
        required: true,
        attributes: ["movieid", "createdAt", "title", "postid"],

        include: [
          {
            model: User,
            attributes: ["username", "fullname", "firstName", "lastName"],
          },
          {
            model: Movie,
            attributes: ["title"],
          },
        ],
      },
    ],
    where: { userid },
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { rows: posts, totalPages } = getPagingData(data, page, limit);
      res.status(200).json({ posts, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const addPost = async (req, res) => {
  try {
    const { content, movieid, title } = req.body;
    const userid = req.userId;
    const newPost = await Post.create({
      userid,
      movieid,
      content,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const postid = newPost.postid;
    res.status(201).json({ postid });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment_content, postid } = req.body;
    const userid = req.userId;
    await UserComment.create({
      userid,
      postid,
      comment_content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteComm = async (req, res) => {
  try {
    const { ucid } = req.body;
    const userid = req.userId;

    const success = await UserComment.update(
      {
        comment_content: RestrictUserCommentMessage,
        updatedAt: new Date(),
      },
      {
        where: {
          ucid,
          userid,
        },
      }
    );

    if (success === 0) {
      res.status(404).json({ message: "Comment doesn't exist" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postid } = req.body;
    const userid = req.userId;

    const success = await Post.update(
      {
        content: RestrictUserPostMessage,
        updatedAt: new Date(),
      },
      {
        where: {
          postid,
          userid,
        },
      }
    );

    if (success === 0) {
      res.status(404).json({ message: "Post doesn't exist" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {
  getHomePosts,
  getMoviePosts,
  getUserPosts,
  getUserComments,
  addPost,
  getPostContent,
  getPostComments,
  addComment,
  deletePost,
  deleteComm,
  getHomeNews,
  getNews,
};
