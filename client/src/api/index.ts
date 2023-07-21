import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
//const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3/movie" });
const profile = localStorage.getItem("profile");
api.interceptors.request.use((req) => {
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

//Movies
export const getGenres = () => api.get(`/genres/get`);
export const getMovies = (page = 1) => api.get(`/movies/page=${page}`);
export const getMoviesFiltered = (page = 1, query: string) =>
  api.get(`/movies/page=${page}/filter/?${query}`);

//Movie
export const getMovie = (id: number) => api.get(`/movies/movie=${id}`);

//NavSearch
export const getMoviesSmallSearch = (page = 1, query: string) =>
  api.get(`/movies/page=${page}/search/?${query}`);

//Home
export const getHomeMovies = () => api.get(`/movies/get/home`);
