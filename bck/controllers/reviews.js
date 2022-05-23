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
    try {
        const reviews = await Review.findAll({
          limit:5,
          include:[
            {model:Movie,attributes:['title','movieid']},
            {model:User,attributes:['username']}
          ],
          order:[['createdAt','DESC']]});
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getMovieReviews = async (req, res) => {
    //TODO orderby likes +pagination +count likes/dislike 
    try {
        const {movieid} =req.params
        const reviews = await Review.findAll({
          attributes:['movieid','content','createdAt','reviewid'],
          include:[{
            model:User,
            attributes:['username'],
          },{
            model:UserLike,
            attributes:['liked']
          }],
          where:{movieid},
        });
  
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
     
    }
  };

const getUserReviewsAndLikes = async (req,res) => {
  try {
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    const reviews = await Review.findAll({attributes:['movieid'],where:{userid}});
    const likes = await UserLike.findAll({attributes:['reviewid','liked'],where:{userid}});
  res.status(200).json({reviews,likes});
} catch (error) {
  res.status(404).json({ message: error.message });
}
}

const getReview = async (req,res) =>{
  try {
    const uuid=req.userId
    const {movieid}=req.params
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    const review = await Review.findOne({attributes:['movieid','content'],where:{userid,movieid}});
  res.status(200).json(review);
} catch (error) {
  res.status(404).json({ message: error.message });
}
}


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
            content
            //:JSON.stringify(content)
            ,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );
      
      res.status(201).json("Success");
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const deleteReview = async (req, res) => {
    try {
    const {movieid}=req.params;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    

    await Review.destroy({
        where:{
            movieid,
            userid
        }
    })
  
    res.status(201).json("Success");
    
} catch (error) {
    res.status(403).json({ message: error.message });
    console.log(error)
}};

  

  const updateReview  = async (req, res) => {
    try {
    
    const {movieid,content}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

    await Review.update(
    {
      content
      //:JSON.stringify(content),
      ,
      updatedAt:new Date()
    },
    {
      where:{
        movieid,
        userid
    }})

    res.status(201).json("Success");
    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  const likeReview  = async (req, res) => {
    try {
    
    const {reviewid}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    const current = await UserLike.findOne({where:{userid,reviewid}})
    if(current){
      await UserLike.update(
      {
        liked:true,
        updatedAt:new Date(),
      },
      {
        where:{
          reviewid,
          userid
      }})
      res.status(201).json("Success");
    }
    else {
      await UserLike.create(
        {
          liked:true,
          reviewid,
          userid,
          createdAt:new Date(),
          updatedAt:new Date(),
        })
        res.status(200).json("Success");
    }

    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  const dislikeReview  = async (req, res) => {
    try {
    
    const {reviewid}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    const current = await UserLike.findOne({where:{userid,reviewid}})
    if(current){
      await UserLike.update(
      {
        liked:false,
        updatedAt:new Date(),
      },
      {
        where:{
          reviewid,
          userid
      }})
      res.status(201).json("Success");
    }
    else {
      await UserLike.create(
        {
          liked:false,
          reviewid,
          userid,
          createdAt:new Date(),
          updatedAt:new Date(),
        })
        res.status(200).json("Success");
    }

    
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


  export {getHomeReviews,getMovieReviews,getUserReviews, deleteReview, addReview, updateReview,getUserReviewsAndLikes,getReview,likeReview,dislikeReview};