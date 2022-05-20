import db from '../models/index.cjs';
import { Op,QueryTypes } from '@sequelize/core';
const {Movie,Review,UserLike,User,sequelize,Sequelize}=db;

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

const getHomeReviews = async (req, res) => {
    //TODO orderby createdat, primele 5 doar
    try {
        const {movieid} =req.params
        const reviews = await Review.findAll({});
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getMovieReviews = async (req, res) => {
    //TODO orderby likes +pagination
    try {
        const {movieid} =req.params
        const reviews = await Review.findAll({where:movieid});
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getUserReviews = async (req, res) => {
    //TODO pagination
    try {
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const reviews = await Review.findAll({where:userid});
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const addReview = async (req, res) => {
    try {
        const {content,movieid}=req.body;
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

        const newReview=await Review.create(
        {   
            userid,
            movieid,
            content,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );
      
      res.status(201).json(newReview);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const deleteReview = async (req, res) => {
    try {
    const {reviewid}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    

    await Review.destroy({
        where:{
            reviewid,
            userid
        }
    })
  
    res.status(201).json("Success");
    
} catch (error) {
    res.status(403).json({ message: error.message });
}};

  

  const updateReview  = async (req, res) => {
    try {
    
    const {updateId,content}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

    await Review.update(
    {
      content,
    },
    {
      where:{
        reviewid:updateId,
        userid
    }})

    res.status(201).json("Success");
    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  export {getHomeReviews,getMovieReviews,getUserReviews, deleteReview, addReview, updateReview};