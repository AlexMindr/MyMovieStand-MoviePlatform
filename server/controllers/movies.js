import axios from "axios";
import db from "../models/index.cjs";
import { Op, QueryTypes } from "@sequelize/core";
import dotenv from "dotenv";
import { getPagination, getPagingData } from "../utils/getPagination.js";

dotenv.config();

const { Movie, Genre, sequelize } = db;
const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3/movie" });
const apiKey = process.env.API_TMDB_KEY;

const getHomeMovies = async (req, res) => {
  try {
    const mostPopular = await Movie.findAll({
      attributes: ["movieid", "title", "poster_path", "popularity", "rating"],
      limit: 5,
      where: {
        popularity: { [Op.ne]: null },
      },
      order: [
        ["popularity", "DESC"],
        ["title", "ASC"],
      ],
    });

    const bestRated = await Movie.findAll({
      attributes: ["movieid", "title", "poster_path", "popularity", "rating"],
      limit: 5,
      where: {
        rating: { [Op.ne]: null },
      },
      order: [
        ["rating", "DESC"],
        ["title", "ASC"],
      ],
    });

    res.status(200).json({ bestRated, mostPopular });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const getMoviesSimpleFilter = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1, 5);
  const { search } = req.query;
  await Movie.findAndCountAll({
    attributes: ["movieid", "title", "poster_path", "keywords"],
    limit,
    offset,
    distinct: true,
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: search ? `%${search}%` : `%`,
          },
        },
        search && search.length >= 3
          ? {
              keywords: {
                [Op.like]: search ? `%${search}%` : `%`,
              },
            }
          : {
              title: {
                [Op.like]: search ? `%${search}%` : `%`,
              },
            },
      ],
    },
    order: [["title", "ASC"]],
  })
    .then((data) => {
      const { rows: movies, totalPages } = getPagingData(data, page, limit);
      res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getMoviesFiltered = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1);
  const { order, sorter, checked, search } = req.query;
  const checkedGenres = checked ? checked.split(",") : null;
  const moviefiltergenres = [];
  if (checkedGenres !== null) {
    const movieids = await sequelize.query(
      "SELECT movies.movieid FROM (movies INNER JOIN moviegenres using(movieid) INNER JOIN genres using(genreid)) WHERE lower(genres.name) in (?) GROUP BY movieid HAVING COUNT(genres.name) >= ?",
      {
        replacements: [
          checkedGenres.flatMap((x) => x.toLocaleLowerCase()),
          checkedGenres.length,
        ],
        type: QueryTypes.SELECT,
      }
    );
    movieids.map((item) => moviefiltergenres.push(item.movieid));
  }
  await Movie.findAndCountAll({
    attributes: [
      "movieid",
      "title",
      "release_date",
      "poster_path",
      "duration",
      "overview",
      "uscertification",
      "rating",
      "popularity",
      "trailer",
      "keywords",
      "adult",
      "status",
    ],
    limit,
    offset,
    distinct: true,
    include: {
      required: true,
      model: Genre,
      attributes: ["name", "genreid"],
      through: {
        attributes: [],
      },
    },
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: search ? `%${search}%` : `%`,
          },
        },
        search && search.length >= 3
          ? {
              keywords: {
                [Op.like]: search ? `%${search}%` : `%`,
              },
            }
          : {
              title: {
                [Op.like]: search ? `%${search}%` : `%`,
              },
            },
      ],
      movieid: checkedGenres ? { [Op.in]: moviefiltergenres } : { [Op.ne]: 0 },
    },
    order: [
      sorter === "release_date"
        ? [
            sequelize.fn("isnull", sequelize.col("release_date")),
            order ? order : "ASC",
          ]
        : [
            sequelize.fn("isnull", sequelize.col("release_date")),
            order ? (order === "ASC" ? "DESC" : "ASC") : "ASC",
          ],
      sorter
        ? [
            sorter === "duration"
              ? sequelize.cast(sequelize.col("duration"), "integer")
              : sorter,
            order ? order : "ASC",
          ]
        : ["title", order ? order : "ASC"],
    ],
  })
    .then((data) => {
      const { rows: movies, totalPages } = getPagingData(data, page, limit);
      res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getMovies = async (req, res) => {
  const { page } = req.params;
  const { limit, offset } = getPagination(page - 1);

  await Movie.findAndCountAll({
    attributes: [
      "movieid",
      "title",
      "release_date",
      "poster_path",
      "duration",
      "overview",
      "uscertification",
      "rating",
      "popularity",
      "trailer",
      "keywords",
      "adult",
    ],
    limit,
    offset,
    distinct: true,
    include: {
      required: false,
      model: Genre,
      attributes: ["name", "genreid"],
      through: {
        attributes: [],
      },
    },
  })
    .then((data) => {
      const { rows: movies, totalPages } = getPagingData(data, page, limit);

      res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      res.status(404).json({ message: "Not found" });
    });
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({
      include: {
        model: Genre,
        attributes: ["name", "genreid"],
        through: {
          attributes: [],
        },
      },
      where: { movieid: id },
    });
    if (movie) res.status(200).json({ movie });
    else res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getMovieImages = async (req, res) => {
  const { tmdb_id } = req.params;
  try {
    const images = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb_id}/images?language=en,null`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const { backdrops, logos, posters } = images.data;
    res.status(200).json({ backdrops, logos, posters });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
const getMovieCredits = async (req, res) => {
  const { tmdb_id } = req.params;

  try {
    const credits = await tmdb.get(`/${tmdb_id}/credits?${apiKey}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const { crew, cast } = credits.data;
    res.status(200).json({ crew, cast });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

export {
  getMovies,
  getMovie,
  getMovieCredits,
  getMovieImages,
  getMoviesFiltered,
  getMoviesSimpleFilter,
  getHomeMovies,
};
