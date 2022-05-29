import axios from 'axios';
import db from '../models/index.cjs';
//import { Op } from '@sequelize/core';
const {Genre}=db;

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll({});
  
      res.status(200).json(genres);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const createGenres = async (req, res) => {
  //TODO ADMIN
  // const useruuid=res.userId
  //   const role=res.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
    const key=process.env.APIKEY;  
    const resp =await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`)
    try {
      let genres=resp.data.genres
      genres.map(async (genre)=>{
      await Genre.bulkCreate([
        {
            genreid:genre.id,
            name:genre.name,
            createdAt:new Date(),
            updatedAt:new Date()
        }
      ])});
      res.status(201).json("Success");
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };


const updateGenres = async (req, res) => {
  //TODO ADMIN
  // const useruuid=res.userId
  //   const role=res.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  
    const key=process.env.APIKEY;  
    const resp =await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`)
    try {
      let genres=resp.data.genres
      
      genres.map(async (genre)=>{
      await Genre.update(
        {
            name:genre.name,
            updatedAt:new Date(),
        },
        {
            where:{
                genreid:genre.id
            }
        }
      )});
      res.status(201).json("Success");
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };
  
  export {getGenres, createGenres, updateGenres};