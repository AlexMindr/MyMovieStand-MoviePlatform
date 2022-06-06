import db from "../models/index.cjs";
import { Op, QueryTypes } from "@sequelize/core";
const { Movie, Post, UserComment, User, sequelize, Sequelize } = db;

function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: posts } = data;
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { posts, totalPages };
}

function getPagingDataGroup(data, page, limit) {
  const { rows: posts } = data;
  const totalItems = data.count.length;
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { posts, totalPages };
}

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
          attributes: ["username", "fullname"],
        },
        {
          model: UserComment,
          required: false,
          attributes: [],
        },
      ],
      group: ["postid"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
        attributes: ["username", "fullname"],
      },
      {
        model: UserComment,
        required: false,
        attributes: [],
      },
    ],

    where: { movieid },
    group: ["postid"],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { posts, totalPages } = getPagingDataGroup(data, page, limit);

      res.status(200).json({ posts, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: error.message });
      //console.log(error)
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
          attributes: ["username", "fullname"],
        },
      ],
      where: { postid },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
        attributes: ["username", "fullname"],
      },
    ],
    where: { postid },
    order: [["createdAt", "ASC"]],
  })
    .then((data) => {
      const { posts: comments, totalPages } = getPagingData(data, page, limit);
      res.status(200).json({ comments, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: error.message });
      //console.log(error)
    });
};

const getUserPosts = async (req, res) => {
  const { username, page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);
  const { userid } = await User.findOne({
    attributes: ["userid"],
    where: { username },
  });

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
        attributes: ["username", "fullname"],
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

    where: { userid },
    group: ["postid"],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { posts, totalPages } = getPagingDataGroup(data, page, limit);

      res.status(200).json({ posts, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: error.message });
      //console.log(error)
    });
};

const getUserComments = async (req, res) => {
  const { username, page, count } = req.params;
  const { limit, offset } = getPagination(page - 1, count);
  const { userid } = await User.findOne({
    attributes: ["userid"],
    where: { username },
  });

  await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      "movieid",
      "createdAt",
      "title",
      "postid",
      //[Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")), "commentCount"]
    ],
    limit,
    offset,
    distinct: true,
    include: [
      {
        model: User,
        attributes: ["username", "fullname"],
      },
      {
        model: UserComment,
        required: false,
        attributes: ["comment_content", "ucid", "createdAt"],
        where: { userid },
        include: [
          {
            model: User,
            attributes: ["username", "fullname"],
          },
        ],
      },
      {
        model: Movie,
        attributes: ["title"],
      },
    ],

    //where:{userid},
    //group:['postid'],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      const { posts, totalPages } = getPagingData(data, page, limit);

      res.status(200).json({ posts, totalPages });
    })

    .catch((error) => {
      res.status(404).json({ message: error.message });
      //console.log(error)
    });
};

const addPost = async (req, res) => {
  try {
    const { content, movieid, title } = req.body;
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });
    const newPost = await Post.create({
      userid,
      movieid,
      content,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const postid = newPost.postid;
    res.status(201).json(postid);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { comment_content, postid } = req.body;
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });
    const newComm = await UserComment.create({
      userid,
      postid,
      comment_content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json("Success");
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const deletePostUser = async (req, res) => {
  const restrictAdmin = {
    blocks: [
      {
        key: "9m832",
        text: "  Post removed by user",
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
    const { postid } = req.body;
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });

    const success = await Post.update(
      {
        content: restrictAdmin,
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
      res.status(403).json({ message: "Post doesn't exist" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updatePost = async (req, res) => {
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

const deleteCommUser = async (req, res) => {
  const restrictAdmin = {
    blocks: [
      {
        key: "9m832",
        text: "  Comment removed by user",
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
    const { ucid } = req.body;
    const uuid = req.userId;
    const { userid } = await User.findOne({
      attributes: ["userid"],
      where: { useruuid: uuid },
    });

    const success = await UserComment.update(
      {
        comment_content: restrictAdmin,
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
      res.status(403).json({ message: "Comment doesn't exist" });
    } else {
      res.status(201).json({ message: "Success" });
    }
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
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
  const restrictAdmin = {
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
          comment_content: restrictAdmin,
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
  getHomePosts,
  getMoviePosts,
  getUserPosts,
  getUserComments,
  deletePost,
  addPost,
  updatePost,
  getPostContent,
  getPostComments,
  addComment,
  deletePostUser,
  restrictPost,
  restrictComm,
  deleteComm,
  deleteCommUser,
};
