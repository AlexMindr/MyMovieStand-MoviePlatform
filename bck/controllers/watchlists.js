import db from '../models/index.cjs';
//import { Op } from '@sequelize/core';
const {Watchlist,User,Movie}=db;

const getWatchlist = async (req, res) => {
    const {id}=req.params
    
    try {
        const watchlist = await Watchlist.findAll({
            where:{
              UserUserid:id
            }, 
            include:{
            model:Movie,
            attributes:['name','title','release_date'],
            /*through:{
              attributes:[]
            }*/
          }});
  
      res.status(200).json(watchlist);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const createWatchlistEntry = async (req, res) => {
  const {id}=req.params
  const {status,episodes,rating,movieid}=req.body
  try {
      
      await Watchlist.create(
        {
            UserUserid:id,
            MovieMovieid:movieid,
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
  const {id}=req.params
  const {status,episodes,rating,movieid}=req.body
  try {
      
      await Watchlist.update(
        {
            status,
            episodes,
            rating,
            updatedAt:new Date()
        },
        {where: {
          UserUserid:id,
          MovieMovieid:movieid
        }}
      );

      res.status(201).json("Success");
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };

  const deleteWatchlistEntry = async (req, res) => {
    const {id}=req.params
    const {movieid}=req.body
    try {
        
        await Watchlist.destroy(
          {where: {
            UserUserid:id,
            MovieMovieid:movieid
          }}
        );
  
        res.status(201).json("Success");
      } catch (error) {
        res.status(403).json({ message: error.message });
      }
    };
  

  export {getWatchlist, createWatchlistEntry, updateWatchlistEntry, deleteWatchlistEntry};