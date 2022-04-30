import db from '../models/index.cjs';
//import { Op } from '@sequelize/core';
const {Watchlist,User,Movie}=db;

const getWatchlistInit = async (req, res) => {
    const uuid=req.userId
    
    try {
        const {userid}= await User.findOne({attributes:['userid'],where:{useruuid:uuid}});
      
        const watchlist = await Watchlist.findAll({
            attributes:['status','rating','episodes','movieid'],
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
            attributes:['status','rating','episodes','movieid'],
            
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
  

  export {getWatchlist, createWatchlistEntry, updateWatchlistEntry, deleteWatchlistEntry, getWatchlistInit};