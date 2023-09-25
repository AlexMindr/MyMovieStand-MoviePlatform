import axios from "axios";
import db from "../models/index.cjs";
import fs from "fs";
import { Op } from "@sequelize/core";
import { writeToPath } from "@fast-csv/format";
import dotenv from "dotenv";
dotenv.config();

const { Movie, Moviegenre, Genre, User, Watchlist, sequelize, Sequelize } = db;
const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3/movie" });
const apiKey = process.env.API_TMDB_KEY;

//movies Admin--------------------------------
const pop = async (req, res) => {
  var movies = [];
  var movies2 = [];
  const data = fs.readFileSync("./data/bypopularity.txt", "utf8", (err) => {
    if (err) console.log(err);
  });
  let idList = data.split(/\r?\n/);
  idList = idList.slice(0, 1304);
  for (let i = 0; i < idList.length; i++) {
    const apimovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${idList[i]}?api_key=${apiKey}&append_to_response=videos,keywords,releases,credits`
    );

    let {
      production_companies,
      production_countries,
      spoken_languages,
      tagline,
      vote_average,
      vote_count,
      adult,
      backdrop_path,
      budget,
      genres,
      homepage,
      id,
      imdb_id,
      popularity,
      original_title,
      title,
      overview,
      poster_path,
      release_date,
      revenue,
      runtime,
      status,
      videos,
      original_language,
      releases,
    } = apimovie.data;
    let { cast, crew } = apimovie.data.credits;
    let { keywords } = apimovie.data.keywords;

    let trailers =
      videos.results.length > 0
        ? videos.results.filter(
            (item) => item.type === "Trailer" && item.site === "YouTube"
          )
        : [];
    if (trailers.length === 0)
      trailers =
        videos.results.length > 0
          ? videos.results.filter(
              (item) => item.type === "Teaser" && item.site === "YouTube"
            )
          : [];
    let trailerPath = trailers.length > 0 ? trailers[0].key : null;

    release_date = release_date ? release_date : null;
    let genreids = [];
    genres.map((genre) => {
      genreids.push({ genreid: genre.id });
    });

    let keywordsarr = "";
    keywords.map((keyword) => {
      keywordsarr += "," + keyword.name;
    });
    keywordsarr = keywordsarr.substring(1);
    releases.countries.map((item) => {
      if (item.iso_3166_1 === "US") {
        uscertification = item.certification;
      }
    });

    // await Movie.create(
    //   {
    //     adult,
    //     backdrop_path,
    //     budget,
    //     homepage,
    //     imdb_id,
    //     tmdb_id: id,
    //     original_title,
    //     title,
    //     overview,
    //     poster_path,
    //     release_date,
    //     revenue,
    //     duration: runtime,
    //     status,
    //     trailer: trailerPath,
    //     language: original_language,
    //     uscertification,
    //     keywords: keywordsarr,
    //     Moviegenres: genreids,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     include: [Moviegenre],
    //   }
    // );
    crew = JSON.stringify(crew);
    cast = JSON.stringify(cast);
    genres = JSON.stringify(genres);
    keywords = JSON.stringify(keywords);
    production_companies = JSON.stringify(production_companies);
    production_countries = JSON.stringify(production_countries);
    spoken_languages = JSON.stringify(spoken_languages);
    movies.push({ movie_id: id, title, cast, crew });
    movies2.push({
      budget,
      genres,
      homepage,
      id,
      keywords,
      original_language,
      original_title,
      overview,
      popularity,
      production_companies,
      production_countries,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      status,
      tagline,
      title,
      vote_average,
      vote_count,
    });
  }

  const path1 = `./data/tmdb_credits.csv`;
  const path2 = `./data/tmdb_movies.csv`;
  const options = { headers: true, quoteColumns: false };

  writeToPath(path1, movies, options)
    .on("error", (err) => console.error(err))
    .on("finish", () => console.log("Done writing."));

  writeToPath(path2, movies2, options)
    .on("error", (err) => console.error(err))
    .on("finish", () => console.log("Done writing."));

  res.status(201).json("Success");
};
const populateMovies = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      var movies = [];
      var movies2 = [];
      const data = fs.readFileSync("./data/bypopularity.txt", "utf8", (err) => {
        if (err) console.log(err);
      });
      let idList = data.split(/\r?\n/);
      idList = idList.slice(0, 1304);
      for (let i = 0; i < idList.length; i++) {
        const apimovie = await axios.get(
          `https://api.themoviedb.org/3/movie/${idList[i]}?api_key=${apiKey}&append_to_response=videos,keywords,releases,credits`
        );

        let {
          production_companies,
          production_countries,
          spoken_languages,
          tagline,
          vote_average,
          vote_count,
          adult,
          backdrop_path,
          budget,
          genres,
          homepage,
          id,
          imdb_id,
          popularity,
          original_title,
          title,
          overview,
          poster_path,
          release_date,
          revenue,
          runtime,
          status,
          videos,
          original_language,
          releases,
        } = apimovie.data;
        let { cast, crew } = apimovie.data.credits;
        let { keywords } = apimovie.data.keywords;

        let trailers =
          videos.results.length > 0
            ? videos.results.filter(
                (item) => item.type === "Trailer" && item.site === "YouTube"
              )
            : [];
        if (trailers.length === 0)
          trailers =
            videos.results.length > 0
              ? videos.results.filter(
                  (item) => item.type === "Teaser" && item.site === "YouTube"
                )
              : [];
        let trailerPath = trailers.length > 0 ? trailers[0].key : null;

        release_date = release_date ? release_date : null;
        let genreids = [];
        genres.map((genre) => {
          genreids.push({ genreid: genre.id });
        });

        let keywordsarr = "";
        keywords.map((keyword) => {
          keywordsarr += "," + keyword.name;
        });
        keywordsarr = keywordsarr.substring(1);
        let uscertification;
        releases.countries.map((item) => {
          if (item.iso_3166_1 === "US") {
            uscertification = item.certification;
          }
        });

        await Movie.create(
          {
            adult,
            backdrop_path,
            budget,
            homepage,
            imdb_id,
            tmdb_id: id,
            original_title,
            title,
            overview,
            poster_path,
            release_date,
            revenue,
            duration: runtime,
            status,
            trailer: trailerPath,
            language: original_language,
            uscertification,
            keywords: keywordsarr,
            Moviegenres: genreids,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            include: [Moviegenre],
          }
        );

        crew = JSON.stringify(crew);
        cast = JSON.stringify(cast);
        genres = JSON.stringify(genres);
        keywords = JSON.stringify(keywords);
        production_companies = JSON.stringify(production_companies);
        production_countries = JSON.stringify(production_countries);
        spoken_languages = JSON.stringify(spoken_languages);
        movies.push({ movie_id: id, title, cast, crew });
        movies2.push({
          budget,
          genres,
          homepage,
          id,
          keywords,
          original_language,
          original_title,
          overview,
          popularity,
          production_companies,
          production_countries,
          release_date,
          revenue,
          runtime,
          spoken_languages,
          status,
          tagline,
          title,
          vote_average,
          vote_count,
        });
      }

      const path1 = `./data/tmdb_credits.csv`;
      const path2 = `./data/tmdb_movies.csv`;
      const options = { headers: true, quoteColumns: false };

      writeToPath(path1, movies, options)
        .on("error", (err) => console.error(err))
        .on("finish", () => console.log("Done writing."));

      writeToPath(path2, movies2, options)
        .on("error", (err) => console.error(err))
        .on("finish", () => console.log("Done writing."));

      res.status(201).json("Success");
    } else {
      res.status(404).json({ message: "You do not have access" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createMovie = async (req, res) => {
  //TODO ADMIN
  // const useruuid=req.userId
  //   const role=req.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  try {
    const { movieid } = req.body;

    const apimovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieid}?api_key=${apiKey}&append_to_response=videos,keywords,releases`
    );

    let {
      adult,
      backdrop_path,
      budget,
      genres,
      homepage,
      id,
      imdb_id,
      popularity,
      original_title,
      title,
      overview,
      poster_path,
      release_date,
      revenue,
      runtime,
      status,
      videos,
      keywords,
      original_language,
      releases,
    } = apimovie.data;

    let trailerPath = videos.results.length > 0 ? videos.results[0].key : null;
    release_date = release_date ? release_date : null;
    let genreids = [];
    genres.map((genre) => {
      genreids.push({ genreid: genre.id });
    });

    let keywordsarr = "";
    keywords.keywords.map((keyword) => {
      keywordsarr += "," + keyword.name;
    });
    keywordsarr = keywordsarr.substring(1);
    let popularitydb = parseInt(popularity);
    let uscertification;
    releases.countries.map((item) => {
      if (item.iso_3166_1 === "US") {
        uscertification = item.certification;
      }
    });

    await Movie.create(
      {
        adult,
        backdrop_path,
        budget,
        homepage,
        imdb_id,
        tmdb_id: id,
        original_title,
        title,
        overview,
        poster_path,
        release_date,
        revenue,
        duration: runtime,
        status,
        trailer: trailerPath,
        language: original_language,
        uscertification,
        keywords: keywordsarr,
        popularity: popularitydb,
        Moviegenres: genreids,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        include: [Moviegenre],
      }
    );

    res.status(201).json("Success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateMovie = async (req, res) => {
  //TODO ADMIN
  // const useruuid=req.userId
  //   const role=req.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  try {
    const { movieid } = req.body;
    const { tmdb_id } = await Movie.findOne({ where: { movieid } });
    await Moviegenre.destroy({ where: { movieid } });

    const apimovie = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${apiKey}&append_to_response=videos,keywords,releases`
    );

    let {
      adult,
      backdrop_path,
      budget,
      genres,
      homepage,
      id,
      imdb_id,
      popularity,
      original_title,
      title,
      overview,
      poster_path,
      release_date,
      revenue,
      runtime,
      status,
      videos,
      keywords,
      original_language,
      releases,
    } = apimovie.data;

    let trailerPath = videos.results.length > 0 ? videos.results[0].key : null;
    release_date = release_date ? release_date : null;
    let genreids = [];
    genres.map((genre) => {
      genreids.push({ genreid: genre.id });
    });

    let keywordsarr = "";
    keywords.keywords.map((keyword) => {
      keywordsarr += "," + keyword.name;
    });
    keywordsarr = keywordsarr.substring(1);
    let popularitydb = parseInt(popularity);
    let uscertification;
    releases.countries.map((item) => {
      if (item.iso_3166_1 === "US") {
        uscertification = item.certification;
      }
    });

    await Movie.update(
      {
        adult,
        backdrop_path,
        budget,
        homepage,
        imdb_id,
        tmdb_id: id,
        original_title,
        title,
        overview,
        poster_path,
        release_date,
        revenue,
        duration: runtime,
        status,
        trailer: trailerPath,
        language: original_language,
        uscertification,
        keywords: keywordsarr,
        popularity: popularitydb,
        updatedAt: new Date(),
      },
      { where: { movieid } }
    );

    genreids.map(async (id) => {
      await Moviegenre.create({
        movieid,
        genreid: id,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    });

    res.status(201).json("Success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updatePopularityAndRating = async (req, res) => {
  try {
    const useruuid = req.userId;
    const role = req.userRole;
    const user = await User.findOne({ where: { useruuid, role } });
    if (user) {
      const movies = await Movie.findAll({ attributes: ["movieid"] });
      movies.map(async (movie) => {
        const countPopularity = await Watchlist.count({
          where: { movieid: movie.movieid },
        });
        const countRating =
          countPopularity > 0
            ? await Watchlist.count({
                where: { movieid: movie.movieid, rating: { [Op.not]: null } },
              })
            : null;
        const sumRating =
          countRating > 0
            ? await Watchlist.sum("rating", {
                where: { movieid: movie.movieid },
              })
            : null;
        const calcRating = countRating > 0 ? sumRating / countRating : null;

        await Movie.update(
          {
            popularity: countPopularity,
            rating: calcRating != 0 ? calcRating : null,
            updatedAt: new Date(),
          },
          {
            where: {
              movieid: movie.movieid,
            },
          }
        );
      });

      res.status(201).json("Success");
    } else {
      res.status(404).json({ message: "You do not have access" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteMovie = async (req, res) => {
  //TODO ADMIN
  // const useruuid=req.userId
  //   const role=req.userRole
  //   const user = await User.findOne({where:{useruuid,role}})
  //   if(user){
  const { id } = req.params;
  try {
    await Movie.destroy({
      where: {
        movieid: id,
      },
    });
    res.status(200).json("Success");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export {
  pop,
  populateMovies,
  updateMovie,
  updatePopularityAndRating,
  deleteMovie,
  createMovie,
};
