import db from '../models/index.cjs';
import { Op,QueryTypes } from '@sequelize/core';
const {Movie,Post,UserComment,User,sequelize,Sequelize}=db;

function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page? page * limit : 0;
  return { limit, offset };
};

function getPagingData(data, page, limit) {
  const { count: totalItems, rows: posts } = data;
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  posts, totalPages };
};

function getPagingDataGroup(data, page, limit) {
  const {rows:posts} = data
  const totalItems= data.count.length
  //const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  posts, totalPages };
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
    
    const {page,count}=req.params;
    const { limit, offset } = getPagination(page-1,count);
    
    const {movieid} =req.params
    await Post.findAndCountAll({
      subQuery:false,
      attributes:[
        'movieid','createdAt','title','postid',
        [Sequelize.fn("COUNT", Sequelize.col("usercomments.ucid")), "commentCount"]
      ],
       limit,
       offset,
       distinct: true,
       include:[{
         model:User,
         attributes:['username','fullname'],
       },
      { 
        model:UserComment,
        required:false,
        attributes:[],
        
      }
    ],

      where:{movieid},
      group:['postid'],
      order:[['createdAt','DESC']],
      
    })
    .then(data => {
      const {posts,totalPages} = getPagingDataGroup(data, page, limit);
      
      res.status(200).json({posts,totalPages});
    })

    .catch(error=>{
      res.status(404).json({ message: error.message });
      //console.log(error)
  })

};

  
const getPostContent = async (req, res) => {
  try {
    const {postid} = req.params
    const posts = await Post.findAll({
      attributes:[
        'movieid','content','createdAt','title','postid',
      ],
      include:[{
         model:User,
         attributes:['username','fullname'],
       },
      ],
      where:{postid}
    
    });

  res.status(200).json(posts);
} catch (error) {
  res.status(404).json({ message: error.message });
}
}

const getPostComments = async (req, res) => {
    const {postid} = req.params
    await UserComment.findAll({
      attributes:['comment_content','ucid','createdAt'],
      limit,
      offset,
      distinct: true, 
      include:[{
         model:User,
         attributes:['username','fullname'],
       },
      ],
      where:{postid},
      order:[['createdAt','ASC']],
    
    })
    .then(data => {
      const {posts:comments,totalPages} = getPagingData(data, page, limit);
      
      res.status(200).json({comments,totalPages});
    })

    .catch(error=>{
      res.status(404).json({ message: error.message });
      //console.log(error)
  }) 
}




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
        const {content,movieid,title}=req.body;
        const uuid=req.userId
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

        const newPost=await Post.create(
        {   
            userid,
            movieid,
            content,
            title,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );
      
      res.status(201).json("Success");
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
    //ADMIN ONLY
    const {updateId,content,title}=req.body;
    const uuid=req.userId
    const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});

    await Post.update(
    {

      title,
      content,
      updatedAt: new Date(),
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

  export {getHomePosts,getMoviePosts,getUserPosts, deletePost, addPost, updatePost,getPostContent,getPostComments};