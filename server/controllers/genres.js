import db from "../models/index.cjs";
import dotenv from "dotenv";
dotenv.config();
const { Genre } = db;

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({});
    return res.status(200).json({ genres });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
};

export { getGenres };
