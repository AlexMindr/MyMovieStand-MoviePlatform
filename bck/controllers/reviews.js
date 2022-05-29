import db from '../models/index.cjs';
import { Op,QueryTypes } from '@sequelize/core';
const {Movie,Review,UserLike,User,sequelize,Sequelize}=db;

function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page? page * limit : 0;
  return { limit, offset };
};

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: reviews } = data;
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  reviews, totalPages };
};

function getPagingDataGroup(data, page, limit) {
  const {rows:reviews} = data
  const totalItems= data.count.length
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  reviews, totalPages };
};


const getHomeReviews = async (req, res) => {
    try {
        
        const reviews= await Review.findAll({
          limit:3,
          subQuery:false,
          attributes:[
            'movieid','content','createdAt','updatedAt','reviewid',
            [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"]
           ],
           distinct: true,
           include:[{
             model:User,
             attributes:['username','fullname'],
           },
          { 
            model:UserLike,
            required:false,
            attributes:[],
            where:{
              liked:{[Op.eq]:true}
            }
          },
          {
            model:Movie,
            required:true,
            attributes:['movieid','title']
          }

        ],
          group:['reviewid'],
          order:[[sequelize.literal('likeCount'),'DESC']],
          
        })
          
      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getMovieReviews = async (req, res) => {
    
        const {page,count}=req.params;
        const { limit, offset } = getPagination(page-1,count);
        
        const {movieid} =req.params
        await Review.findAndCountAll({
          subQuery:false,
          attributes:[
            'movieid','content','createdAt','updatedAt','reviewid',
            [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"]
           ],
           limit,
           offset,
           distinct: true,
           include:[{
             model:User,
             attributes:['username','fullname'],
           },
          { 
            model:UserLike,
            required:false,
            attributes:[],
            where:{
              liked:{[Op.eq]:true}
            }
          }
        ],
          where:{movieid},
          group:['reviewid'],
          order:[[sequelize.literal('likeCount'),'DESC']],
          
        })
        .then(data => {
          const {reviews,totalPages} = getPagingDataGroup(data, page, limit);
          
          res.status(200).json({reviews,totalPages});
        })
  
        .catch(error=>{
          res.status(404).json({ message: error.message });
          //console.log(error)
      })
  
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

const getLikesForReview = async (req,res) =>{
  try {
    const uuid=req.userId
    const {reviewid}=req.params
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
    if (userid){
    const likes = await UserLike.count({
      attributes:['liked'],
      where:{
        //userid,
        reviewid,
        liked:true,
      }
    });
    const dislikes = await UserLike.count({
      attributes:['liked'],
      where:{
        //userid,
        reviewid,
        liked:false,
      }
    });

    res.status(200).json({likes,dislikes});
  }
  else {
    res.status(403).json({ message: error.message });  
  }
} catch (error) {
  res.status(404).json({ message: error.message });
}
}


const getUserReviews = async (req, res) => {
    
      //const uuid=req.userId
      //const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      const {username,page,count}=req.params;
      const { limit, offset } = getPagination(page-1,count);
      const {userid}= await User.findOne({attributes:['userid'],where:{username}});
        
        await Review.findAndCountAll({
          subQuery:false,
          attributes:[
            'movieid','content','createdAt','updatedAt','reviewid',
            [Sequelize.fn("COUNT", Sequelize.col("userlikes.liked")), "likeCount"]
           ],
           limit,
           offset,
           distinct: true,
           include:[{
             model:User,
             attributes:['username','fullname'],
           },
          { 
            model:UserLike,
            required:false,
            attributes:[],
            where:{
              liked:{[Op.eq]:true},
            },
          },
          {
            model:Movie,
            attributes:['title'],
          },
        ],
          where:{userid},
          group:['reviewid'],
          order:[[sequelize.literal('likeCount'),'DESC']],
          
        })
        .then(data => {
          const {reviews,totalPages} = getPagingDataGroup(data, page, limit);
          
          res.status(200).json({reviews,totalPages});
        })
  
        .catch(error=>{
          res.status(404).json({ message: error.message });
          //console.log(error)
      })
      
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

  
 //TODO updaterevadmin
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


  export {getHomeReviews,getMovieReviews,getUserReviews, deleteReview, addReview, updateReview,
    getUserReviewsAndLikes,getReview,likeReview,dislikeReview,getLikesForReview};