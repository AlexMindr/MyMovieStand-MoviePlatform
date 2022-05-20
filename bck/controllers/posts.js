import db from '../models/index.cjs';
import { Op,QueryTypes } from '@sequelize/core';
const {Movie,Post,UserComment,User,sequelize,Sequelize}=db;

function getPagination(page, size) {
  const limit = size ? +size : 21;
  const offset = page? page * limit : 0;
  return { limit, offset };
};

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: movies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  movies, totalPages };
};


const getHomePosts = async (req, res) => {
    //TODO orderby createdat, primele 5 doar
    try {
      const posts = await Post.findAll({});
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getMoviePosts = async (req, res) => {
    //TODO orderby comment count +pagination
    try {
        const {movieid} =req.params
        const posts = await Post.findAll({where:movieid});
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getUserPosts = async (req, res) => {
    //TODO pagination
    try {
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const posts = await Post.findAll({where:userid});
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const addPost = async (req, res) => {
    try {
        const {content,movieid}=req.body;
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

        const newPost=await Post.create(
        {   
            userid,
            movieid,
            content,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );
      
      res.status(201).json(newPost);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const deletePost = async (req, res) => {
    try {
    const {postid}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    

    await Post.destroy({
        where:{
            postid,
            userid
        }
    })
  
    res.status(201).json("Success");
    
} catch (error) {
    res.status(403).json({ message: error.message });
}};

  

  const updatePost  = async (req, res) => {
    try {
    
    const {updateId,content}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

    await Post.update(
    {
      content,
    },
    {
      where:{
        postid:updateId,
        userid
    }})

    res.status(201).json("Success");
    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  export {getHomePosts,getMoviePosts,getUserPosts, deletePost, addPost, updatePost};