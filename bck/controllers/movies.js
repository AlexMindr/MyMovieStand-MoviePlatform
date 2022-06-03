import axios from 'axios';
import db from '../models/index.cjs';
import fs from 'fs';
import { Op,QueryTypes } from '@sequelize/core';

const {Movie,Moviegenre,Genre,User,Watchlist,sequelize,Sequelize}=db;

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


const getHomeMovies = async (req, res) => {
 try{
  
  const mostPopular = await Movie.findAll({
        attributes:['movieid','title','poster_path','popularity','rating'], 
        limit:5,
        where:{
           popularity:{[Op.ne]:null}
        },
        order:[
         ['popularity','DESC'],
         ['title','ASC']
        ],
      })
     
  const bestRated = await Movie.findAll({
    attributes:['movieid','title','poster_path','popularity','rating'], 
    limit:5,
    where:{
        rating:{[Op.ne]:null}
    },
    order:[
      ['rating','DESC'],
      ['title','ASC']
    ],
  })

    res.status(200).json({bestRated,mostPopular});
 
    } catch(error){
      res.status(404).json({ message: error.message });
     console.log(error)
  }
}


const getMoviesSimpleFilter = async (req, res) => {
  //TODO schimbat page-1 in 0 daca nu folosesc in alta parte + path
  const {page}=req.params;
  const { limit, offset } = getPagination(page-1,5);
  const {search}=req.query
    await Movie.findAndCountAll({
        attributes:['movieid','title','poster_path','keywords'], 
        limit,
        offset,
        distinct: true,
        where:{
           [Op.or]:[
             {
               title:{
                [Op.like]:search?`%${search}%`:`%`
               }
             },
             search&&search.length>=3?{
               keywords:{
                [Op.like]:search?`%${search}%`:`%`
               }
             }:{
              title:{
                [Op.like]:search?`%${search}%`:`%`
               }
              },
           ],
           
        },
        order:[
          ['title','ASC']
        ],
      })
      .then(data => {
        const {movies,totalPages} = getPagingData(data, page, limit);
        
        res.status(200).json({movies,totalPages});
      })

      .catch(error=>{
        res.status(404).json({ message: error.message });
        //console.log(error)
    })
}

const getMoviesFiltered = async (req, res) => {
  const {page}=req.params;
  const { limit, offset } = getPagination(page-1);
  const {order,sorter,checked,search}=req.query
  let checkedGenres=checked?checked.split(','):null
  let moviefiltergenres=[]
  if(checkedGenres!==null){
  const movieids =await sequelize.query(
    "SELECT movies.movieid FROM (movies INNER JOIN moviegenres using(movieid) INNER JOIN genres using(genreid)) WHERE lower(genres.name) in (?) GROUP BY movieid HAVING COUNT(genres.name) >= ?",
    {
      replacements: [checkedGenres.flatMap((x) => x.toLocaleLowerCase()),checkedGenres.length],
      type: QueryTypes.SELECT
    }
  );
  movieids.map((item)=>moviefiltergenres.push(item.movieid))
  }
    await Movie.findAndCountAll({
        attributes:['movieid','title','release_date','poster_path','duration',
        'overview','uscertification','rating','popularity','trailer','keywords','adult','status'], 
        limit,
        offset,
        distinct: true,
        include:{
          required:true,
          model:Genre,
          attributes:['name','genreid'],
          through:{
            attributes:[]
          },
         },
        where:{
           [Op.or]:[
             {
               title:{
                [Op.like]:search?`%${search}%`:`%`
               }
             },
             search&&search.length>=3?{
               keywords:{
                [Op.like]:search?`%${search}%`:`%`
               }
             }:{
              title:{
                [Op.like]:search?`%${search}%`:`%`
               }
              },
           ],
           movieid:checkedGenres?{[Op.in]:moviefiltergenres}:{[Op.ne]:0}
          
        },
        order:[ 
          sorter==='release_date'?[sequelize.fn('isnull', sequelize.col('release_date')),order?order:'ASC']
          :
          [sequelize.fn('isnull', sequelize.col('release_date')),order?order==='ASC'?'DESC':'ASC':'ASC'],
          sorter?
          [sorter==='duration'?sequelize.cast(sequelize.col('duration'),'integer'):sorter,order?order:'ASC']:['title',order?order:'ASC']
        ],
      })
      .then(data => {
        const {movies,totalPages} = getPagingData(data, page, limit);
        
        res.status(200).json({movies,totalPages});
      })

      .catch(error=>{
        res.status(404).json({ message: error.message });
        //console.log(error)
    })
}


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



const populateMovies = async (req, res) => {
  //TODO ADMIN
  // const useruuid=res.userId
  //   const role=res.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  //TODO get oldest video?
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
            
            let trailerPath=videos.results.length>0?videos.results[0].key:null;
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
    const key=process.env.APIKEY;  
    
    //TODO ADMIN
    // const useruuid=res.userId
    //   const role=res.userRole
    //   const user = await User.findOne({where:{useruuid,role}})
    //   if(user){
    
    try {

        const {movieid}=req.body
    
        const apimovie =await axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${key}&append_to_response=videos,keywords,releases`)
    
        let {adult,backdrop_path,budget,genres,homepage,id,imdb_id,popularity,original_title,title,overview,
        poster_path,release_date,revenue,runtime,status,videos,keywords,original_language,releases}=apimovie.data;
        
        let trailerPath=videos.results.length>0?videos.results[0].key:null;
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
       
         
      res.status(201).json("Success");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

  const updateMovie = async (req, res) => {
    const key=process.env.APIKEY;  
    
    //TODO ADMIN
    // const useruuid=res.userId
    //   const role=res.userRole
    //   const user = await User.findOne({where:{useruuid,role}})
    //   if(user){
  try{
      
      const {movieid}=req.body
      const {tmdb_id}=await Movie.findOne({where:{movieid}})
      await Moviegenre.destroy({where:{movieid}})

      const apimovie =await axios.get(`https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${key}&append_to_response=videos,keywords,releases`)
  
      let {adult,backdrop_path,budget,genres,homepage,id,imdb_id,popularity,original_title,title,overview,
      poster_path,release_date,revenue,runtime,status,videos,keywords,original_language,releases}=apimovie.data;
      
      let trailerPath=videos.results.length>0?videos.results[0].key:null;
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
      
      await Movie.update({
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
            updatedAt:new Date()
        },{where:{movieid}})

        genreids.map(async (id) =>{
          await Moviegenre.create({
            movieid,
            genreid:id, 
            updatedAt:new Date(),
            createdAt:new Date(),
          })
  
        })
        

      res.status(201).json("Success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

      
const updatePopularityAndRating = async (req, res) => {
  //TODO ADMIN
  // const useruuid=res.userId
  //   const role=res.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  
  try {
          const movies=await Movie.findAll({attributes:['movieid']})
          movies.map(async (movie)=>{
            const countPopularity=await Watchlist.count({where:{movieid:movie.movieid}})
            const countRating=countPopularity>0?await Watchlist.count({where:{movieid:movie.movieid,rating:{[Op.not]:null}}}):null
            const sumRating=countRating>0?await Watchlist.sum('rating',{where:{movieid:movie.movieid}}):null
            const calcRating=countRating>0?sumRating/countRating:null
            
            await Movie.update({
              popularity:countPopularity,
              rating:calcRating!=0?calcRating:null,
              updatedAt:new Date()
              },{
              where:{
                movieid:movie.movieid
              }});
    
              })
          
    
          
        res.status(201).json("Success");
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
    

  const deleteMovie = async (req, res) => {
      //TODO ADMIN
    // const useruuid=res.userId
    //   const role=res.userRole
    //   const user = await User.findOne({where:{useruuid,role}})
    //   if(user){
  
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
  export { getMovies, getMovie, populateMovies, createMovie, updateMovie, deleteMovie,getMoviesFiltered,getMoviesSimpleFilter,getHomeMovies,updatePopularityAndRating };