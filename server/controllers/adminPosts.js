import db from "../models/index.cjs";
import dotenv from "dotenv";
dotenv.config();
const { Post, UserComment, User } = db;

//posts/comments/news for posts Admin
const addNews = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { title, content, movieid } = req.body;

      const newPost = await Post.create({
        userid: user.userid,
        movieid,
        content,
        title,
        post_type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const postid = newPost.postid;
      res.status(201).json(postid);
    } else res.status(403).json({ message: error.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateNews = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
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
        res.status(403).json({ message: "Post doesn't exist" });
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
const deletePost = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { postid } = req.params;

      const success = await Post.destroy({
        where: {
          postid,
        },
      });

      if (success === 0) {
        res.status(403).json({ message: "Post doesn't exist" });
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
const restrictPost = async (req, res) => {
  const restrictAdmin = {
    blocks: [
      {
        key: "9m832",
        text: "  Post removed by admin",
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
      const { postid } = req.body;

      const success = await Post.update(
        {
          content: restrictAdmin,
          updatedAt: new Date(),
        },
        {
          where: {
            postid,
          },
        }
      );

      if (success === 0) {
        res.status(403).json({ message: "Post doesn't exist" });
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
const deleteComm = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const { ucid } = req.params;

      const success = await UserComment.destroy({
        where: {
          ucid,
        },
      });

      if (success === 0) {
        res.status(403).json({ message: "Comment doesn't exist" });
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
const restrictComm = async (req, res) => {
  const restrictMessage = {
    blocks: [
      {
        key: "9m832",
        text: "  Comment removed by admin",
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
      const { ucid } = req.body;

      const success = await UserComment.update(
        {
          comment_content: restrictMessage,
          updatedAt: new Date(),
        },
        {
          where: {
            ucid,
          },
        }
      );

      if (success === 0) {
        res.status(403).json({ message: "Comment doesn't exist" });
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

export {
  addNews,
  updateNews,
  deleteComm,
  deletePost,
  restrictComm,
  restrictPost,
};
