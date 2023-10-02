import db from "../models/index.cjs";
import dotenv from "dotenv";
import {
  RestrictAdminPostMessage,
  RestrictAdminCommentMessage,
} from "../utils/messagesRestrictDelete.js";

dotenv.config();
const { Post, UserComment, User } = db;

//posts/comments/news for posts Admin
const addNews = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { title, content, movieid } = req.body;

      const newPost = await Post.create({
        userid: userid,
        movieid,
        content,
        title,
        post_type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const postid = newPost.postid;
      return res.status(201).json({ postid });
    } else return res.status(403).json({ message: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { title, content, postid } = req.body;

      const success = await Post.update(
        {
          title,
          content,
          updatedAt: new Date(),
        },
        {
          where: {
            postid,
          },
        }
      );

      if (success === 0) {
        return res.status(404).json({ message: "Post doesn't exist" });
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

const deletePost = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { postid } = req.params;

      const success = await Post.destroy({
        where: {
          postid,
        },
      });

      if (success === 0) {
        return res.status(404).json({ message: "Post doesn't exist" });
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

const restrictPost = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { postid } = req.body;

      const success = await Post.update(
        {
          content: RestrictAdminPostMessage,
          updatedAt: new Date(),
        },
        {
          where: {
            postid,
          },
        }
      );

      if (success === 0) {
        return res.status(404).json({ message: "Post doesn't exist" });
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

const deleteComm = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { ucid } = req.params;

      const success = await UserComment.destroy({
        where: {
          ucid,
        },
      });

      if (success === 0) {
        return res.status(404).json({ message: "Comment doesn't exist" });
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

const restrictComm = async (req, res) => {
  try {
    const userid = req.userId;
    if (userid) {
      const { ucid } = req.body;

      const success = await UserComment.update(
        {
          comment_content: RestrictAdminCommentMessage,
          updatedAt: new Date(),
        },
        {
          where: {
            ucid,
          },
        }
      );

      if (success === 0) {
        return res.status(404).json({ message: "Comment doesn't exist" });
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
  addNews,
  updateNews,
  deleteComm,
  deletePost,
  restrictComm,
  restrictPost,
};
