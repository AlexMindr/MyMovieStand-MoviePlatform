import {
  getGenres,
  getMovies,
  getMoviesFiltered,
  getMovie,
  getMoviesSearch,
} from "@/api";
import handleError from "@/shared/utils/handleError";

export const apiGetMoviesFiltered = async (query: string, amount: string) => {
  try {
    const { data } = await getMoviesFiltered(query, amount);
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};
export const apiGetGenres = async () => {
  try {
    const { data } = await getGenres();
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};

export const apiGetMovie = async (id: string) => {
  try {
    const { data } = await getMovie(id);
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};

export const apiGetMoviesNavSearch = async (query: string) => {
  try {
    const { data } = await getMoviesSearch(query);
    return data;
  } catch (error: unknown) {
    handleError(error);
  }
};
