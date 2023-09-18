import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
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
export const getMovie = (id: string) => api.get(`/movies/movie=${id}`);
export const getMovieCredits = (tmdb_id: string) =>
  api.get(`/movies/movie=${tmdb_id}/credits`);
export const getMovieImages = (tmdb_id: string) =>
  api.get(`/movies/movie=${tmdb_id}/images`);
export const getMovieReviews = (movieid: number, page: number, count: number) =>
  api.get(`/reviews/get/movie/${movieid}/page=${page}/count=${count}`);

//NavSearch
export const getMoviesSearch = (page = 1, query: string) =>
  api.get(`/movies/page=${page}/search/?${query}`);

//Home
export const getHomeMovies = () => api.get(`/movies/get/home`);

//User auth
export const login = (formValues: FormData) =>
  api.post("/user/login", formValues);
export const signup = (formValues: FormData) =>
  api.post("/user/signup", formValues);
