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

    return res.status(200).json({ bestRated, mostPopular });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
};

const getMoviesSimpleFilter = async (req, res) => {
  const page = 1;
  const { limit, offset } = getPagination(page - 1, 5);
  const { title } = req.query;
  await Movie.findAndCountAll({
    attributes: ["movieid", "title", "poster_path", "keywords"],
    limit,
    offset,
    distinct: true,
    where: {
      title: {
        [Op.like]: title ? `%${title}%` : `%`,
      },
    },
    order: [["title", "ASC"]],
  })
    .then((data) => {
      const { rows: movies, totalPages } = getPagingData(data, page, limit);
      return res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Not found" });
    });
};

const getMoviesFiltered = async (req, res) => {
  const { page, order, sort, genres, search, keywords } = req.query;
  const { amount } = req.params;
  const pageDecoded = page ? decodeURIComponent(page) : page;
  const amountDecoded = amount ? decodeURIComponent(amount) : amount;
  const orderDecoded = order ? decodeURIComponent(order) : order;
  const sortDecoded = sort ? decodeURIComponent(sort) : sort;
  const genresDecoded = genres ? decodeURIComponent(genres) : genres;
  const searchDecoded = search ? decodeURIComponent(search) : search;
  const keywordsDecoded = keywords ? decodeURIComponent(keywords) : keywords;
  console.log({
    pageDecoded,
    searchDecoded,
    amountDecoded,
    orderDecoded,
    genresDecoded,
    searchDecoded,
    keywordsDecoded,
  });
  const pageNumber = parseInt(pageDecoded) > 0 ? parseInt(pageDecoded) : 1;
  const { limit, offset } = getPagination(
    pageNumber - 1,
    parseInt(amountDecoded)
  );
  const checkedGenres = genresDecoded ? genresDecoded.split(",") : null;
  const moviefiltergenres = [];
  if (checkedGenres != null) {
    const movieids = await sequelize.query(
      "SELECT movies.movieid FROM (movies INNER JOIN moviegenres using(movieid) INNER JOIN genres using(genreid)) WHERE lower(genres.name) \
      in (?) GROUP BY movieid HAVING COUNT(genres.name) >= ?",
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
    where: keywordsDecoded
      ? {
          [Op.or]: [
            {
              title: {
                [Op.like]: searchDecoded ? `%${searchDecoded}%` : `%`,
              },
            },
            searchDecoded && searchDecoded.length >= 3
              ? {
                  keywords: {
                    [Op.like]: searchDecoded ? `%${searchDecoded}%` : `%`,
                  },
                }
              : {
                  title: {
                    [Op.like]: searchDecoded ? `%${searchDecoded}%` : `%`,
                  },
                },
          ],
          movieid: checkedGenres
            ? { [Op.in]: moviefiltergenres }
            : { [Op.ne]: 0 },
        }
      : {
          title: {
            [Op.like]: searchDecoded ? `%${searchDecoded}%` : `%`,
          },
          movieid: checkedGenres
            ? { [Op.in]: moviefiltergenres }
            : { [Op.ne]: 0 },
        },

    order: [
      sortDecoded === "release_date"
        ? [
            sequelize.fn("isnull", sequelize.col("release_date")),
            orderDecoded ? orderDecoded : "ASC",
          ]
        : [
            sequelize.fn("isnull", sequelize.col("release_date")),
            orderDecoded ? (orderDecoded === "ASC" ? "DESC" : "ASC") : "ASC",
          ],
      sortDecoded
        ? [
            sortDecoded === "duration"
              ? sequelize.cast(sequelize.col("duration"), "integer")
              : sortDecoded,
            orderDecoded ? orderDecoded : "ASC",
          ]
        : ["title", orderDecoded ? orderDecoded : "ASC"],
    ],
  })
    .then((data) => {
      const { rows: movies, totalPages } = getPagingData(
        data,
        pageDecoded,
        limit
      );
      return res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Not found" });
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

      return res.status(200).json({ movies, totalPages });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Not found" });
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
    if (movie) return res.status(200).json({ movie });
    else return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
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
    return res.status(200).json({ backdrops, logos, posters });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
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
    return res.status(200).json({ crew, cast });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
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
