import db from '../models/index.cjs';
import { Op } from '@sequelize/core';
const {Watchlist,User,Movie}=db;

const getWatchlistInit = async (req, res) => {
    const uuid=req.userId
    
    try {
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      
        const watchlist = await Watchlist.findAll({
            attributes:['status','rating','episodes','movieid','favourite'],
            where:{
              userid
            }, 
          });
  
      res.status(200).json({watchlist});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


const getWatchlist = async (req, res) => {
    //const uuid=req.userId
    const {username}=req.params;
    try {
        // const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const {userid}= await User.findOne({attributes:['userid'],where:{username}});
      
      
        const watchlist = await Watchlist.findAll({
            attributes:['status','rating','episodes','movieid',],
            
            where:{
              userid
            }, 
            include:{
            model:Movie,
            attributes:['title','release_date','poster_path','uscertification'],
            },
            order:[
              [Movie,'title','ASC'],
              ['rating','DESC']
            ],
          });
          
      res.status(200).json({watchlist});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const createWatchlistEntry = async (req, res) => {
  const uuid=req.userId
  const {status,episodes,rating,movieid}=req.body
  try {
      const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      //const countFav = await Watchlist.count({attributes:['favourite'],where:userid})

     
      await Watchlist.create(
        {
            userid:userid,
            movieid,
            status,
            episodes,
            rating,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      );

      res.status(201).json("Success");
      
      
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const updateWatchlistEntry = async (req, res) => {
  const uuid=req.userId
  const {status,episodes,rating,movieid}=req.body
  try {
      
      const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      
      await Watchlist.update(
        {
            status,
            episodes,
            rating,
            updatedAt:new Date()
        },
        {where: {
          userid,
          movieid
        }}
      );

      res.status(201).json("Success");
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  const deleteWatchlistEntry = async (req, res) => {
    const uuid=req.userId
    const {movieid}=req.body
    try {
        
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      
        await Watchlist.destroy(
          {where: {
            userid,
            movieid
          }}
        );
  
        res.status(201).json("Success");
      } catch (error) {
        res.status(403).json({ message: error.message });
      }
    };
  
  const addFavourite = async (req, res) => {
    const uuid=req.userId
    const {movieid}=req.body
    try {
        
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const countFav=await Watchlist.count({
          attributes:['favourite'],
          where:{
            userid,
            favourite:true,
            //status:{[Op.eq]:wlName}
          }
        })
        if (countFav>=6)
          res.status(403).json({ message: 'You cannot have more than 6 favourite movies!' });

        
        await Watchlist.update(
          {
              favourite:true,
              updatedAt:new Date()
          },
          {where: {
            userid,
            movieid
          }}
        );
  
        res.status(201).json("Success");
      } catch (error) {
        res.status(403).json({ message: error.message });
      }
    };

  const removeFavourite = async (req, res) => {
    const uuid=req.userId
    const {movieid}=req.body
    try {
        
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        
        await Watchlist.update(
          {
              favourite:false,
              updatedAt:new Date()
          },
          {where: {
            userid,
            movieid
          }}
        );
  
        res.status(201).json("Success");
      } catch (error) {
        res.status(403).json({ message: error.message });
      }
    };  
    
  const getFavouritesProfile = async (req, res) => {
    //const uuid=req.userId
    const {username}=req.params;
    try {
        // const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        const {userid}= await User.findOne({attributes:['userid'],where:{username}});
      
      
        const favourites = await Watchlist.findAll({
            attributes:['status','rating','movieid','favourite'],
            
            where:{
              userid,
              favourite:true
            }, 
            include:{
            model:Movie,
            attributes:['title','poster_path',],
            },
            order:[
              ['rating','DESC'],
              [Movie,'title','ASC'],
              
            ],
          });
          
      res.status(200).json({favourites});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  const getFavourites = async (req, res) => {
    const uuid=req.userId
    
    try {
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
        
        const watchlist = await Watchlist.findAll({
          attributes:['status','rating','movieid','favourite'],
          where:{
            userid,
            status:{[Op.or]:['Completed','Watching','On-hold']},
            favourite:false,
          }, 
          include:{
          model:Movie,
          attributes:['title','poster_path',],
          },
          order:[
            ['rating','DESC'],
            [Movie,'title','ASC'],
            
          ],
        });
        
        const favourites = await Watchlist.findAll({
            attributes:['status','rating','movieid','favourite'],
            
            where:{
              userid,
              favourite:true
            }, 
            include:{
            model:Movie,
            attributes:['title','poster_path',],
            },
            order:[
              ['rating','DESC'],
              [Movie,'title','ASC'],
              
            ],
          });
          
      res.status(200).json({favourites,watchlist});
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export {getWatchlist, createWatchlistEntry, updateWatchlistEntry, deleteWatchlistEntry,
     getWatchlistInit,addFavourite, removeFavourite,getFavourites,getFavouritesProfile};