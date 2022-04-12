import axios from 'axios';
import db from '../models/index.cjs';
import fs from 'fs';
//import { Op } from '@sequelize/core';

const {Movie,Moviegenre,Genre,User}=db;

const getPagination = (page, size) => {
  const limit = size ? +size : 21;
  const offset = page? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: movies } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {  movies, totalPages };
};


const getMovies = async (req, res) => {
    const {page}=req.params;
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page-1);
    
  
      await Movie.findAndCountAll({
          attributes:['movieid','title','release_date','poster_path',
          'duration','overview','uscertification','rating','popularity','trailer','keywords','adult'], 
          limit,
          offset,
          distinct: true,
          include:{
            required:false,
            model:Genre,
            attributes:['name','genreid'],
            through:{
              attributes:[]
            },
            
          }
        })
        .then(data => {
          const {movies,totalPages} = getPagingData(data, page, limit);
          
          res.status(200).json({movies,totalPages});
        })

        .catch(error=>{
          res.status(404).json({ message: error.message });
      })
}

const getMovie = async (req, res) => {
  const {id} = req.params
  try {
      const movie = await Movie.findOne({
        include:{
          model:Genre,
          attributes:['name','genreid'],
          through:{
            attributes:[]
          }
        },
        where: {movieid:id } 
      });

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//de facut api request la tmdb la imagini pt galerie
const populateMovies = async (req, res) => {
  const key=process.env.APIKEY;  
    try {
        const data = fs.readFileSync("./data/bypopularity.txt", "utf8", (err) => {
          if (err) console.log(err);
        });
        let idList=data.split(/\r?\n/)
        //commentat/sters ulterior      
        idList=idList.slice(0,100)
        idList.map(async (idtoGet)=>{
    
            const apimovie =await axios.get(`https://api.themoviedb.org/3/movie/${idtoGet}?api_key=${key}&append_to_response=videos,keywords,releases`)
        
            let {adult,backdrop_path,budget,genres,homepage,id,imdb_id,popularity,original_title,title,overview,
            poster_path,release_date,revenue,runtime,status,videos,keywords,original_language,releases}=apimovie.data;
            
            let trailerPath=videos.results[0]!=undefined?videos.results[0].key:null;
            release_date=release_date?release_date:null
            let genreids=[]
            genres.map((genre)=>{genreids.push({genreid:genre.id})})
            
            let keywordsarr=""
            keywords.keywords.map((keyword)=>{keywordsarr+=","+keyword.name})
            keywordsarr=keywordsarr.substring(1)
            let popularitydb= parseInt(popularity)
            let uscertification;
            releases.countries.map((item)=>{
              if (item.iso_3166_1==='US')
              {
                uscertification=item.certification; 
              }
            })
            /*if (videos.results[0]==undefined)
            console.log(idtoGet)*/
            await Movie.create({
                  adult,
                  backdrop_path,
                  budget,
                  homepage,
                  imdb_id,
                  tmdb_id:id,
                  original_title,
                  title,
                  overview,
                  poster_path,
                  release_date,
                  revenue,
                  duration:runtime,
                  status,
                  trailer:trailerPath,
                  language:original_language,
                  uscertification,
                  keywords:keywordsarr,
                  popularity:popularitydb,
                  Moviegenres:genreids,
                  createdAt:new Date(),
                  updatedAt:new Date()
              },{
                include: [Moviegenre]
              })
        
      });
        
     res.status(201).json("Success");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  
  const createMovie = async (req, res) => {
    
    try {
      
      let {adult,backdrop_path,budget,homepage,tmdb_id,imdb_id,original_title,title,overview,
        poster_path,release_date,revenue,duration,status,trailer_path,keywords,original_language,uscertification,genres}=req.body;
          
          
          genres=genres.split(',');
          let genreids=[]
          genres.map((genre)=>{genreids.push({genreid:genre.id})})
        
          await Movie.create({
                adult,
                backdrop_path,
                budget,
                homepage,
                imdb_id,
                tmdb_id,
                original_title,
                title,
                overview,
                poster_path,
                release_date,
                revenue,
                duration,
                status,
                trailer:trailer_path,
                language:original_language,
                uscertification,
                keywords,
                Moviegenres:genreids,
                createdAt:new Date(),
                updatedAt:new Date()
            },{
              include: [Moviegenre]
            })
      
        
          
       res.status(201).json("Success");
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };
  

  const updateMovie = async (req, res) => {
    const {movieid}=req.params
    let {adult,backdrop_path,budget,homepage,tmdb_id,imdb_id,popularity,original_title,title,overview,
      poster_path,release_date,revenue,duration,status,trailer_path,keywords,original_language,uscertification/*,genres*/}=req.body;
    
    try {
            rating=0;
            //de facut rating update endpoint separat din suma din wl / numarul de oameni din wl; la fel la popularity 
            //genres update not working
            /*genres=genres.split(',');
            let genreids=[]
            genres.map((genre)=>{genreids.push({genreid:genre.id})})
            
            await Moviegenre.update({
              genreid:genreids,
              updatedAt: new Date()
            },{
              where:{
              movieid:movieid
            }});
            */
            await Movie.update({
                  adult,
                  backdrop_path,
                  budget,
                  homepage,
                  imdb_id,
                  tmdb_id,
                  original_title,
                  title,
                  overview,
                  poster_path,
                  release_date,
                  revenue,
                  duration,
                  status,
                  trailer:trailer_path,
                  language:original_language,
                  uscertification,
                  keywords:keywords,
                  popularity,
                  rating,
                  updatedAt:new Date()
              },{
                where:{
                  movieid
              }});
        
      
            
         res.status(201).json("Success");
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      };
    

  const deleteMovie = async (req, res) => {
    
    const { id } = req.params;
    try {
      
      await Movie.destroy({
        where: {
          movieid:id
        }
      }); 
       res.status(200).json("Success");
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  };
  export { getMovies, getMovie, populateMovies, createMovie, updateMovie, deleteMovie };