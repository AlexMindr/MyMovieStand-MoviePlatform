import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
const profile = localStorage.getItem("profile");
api.interceptors.request.use((req) => {
  const accessToken = profile ? JSON.parse(profile)?.token : null;
  if (accessToken && profile) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

//Movies
export const getGenres = () => api.get(`/genres/get`);
export const getMovies = (page = 1) => api.get(`/movies/get/page=${page}`);
export const getMoviesFiltered = (query: string, amount: string) =>
  api.get(`/movies/amount=${amount}/filter${query}`);

//Movie
export const getMovie = (id: string) => api.get(`/movies/movie=${id}`);
export const getMovieCredits = (tmdb_id: string) =>
  api.get(`/movies/credits/movie=${tmdb_id}`);
export const getMovieImages = (tmdb_id: string) =>
  api.get(`/movies/images/movie=${tmdb_id}`);
export const getMovieReviews = (movieid: number, page: number, count: number) =>
  api.get(`/reviews/get/movie/${movieid}/page=${page}/count=${count}`);

//NavSearch
export const getMoviesSearch = (query: string) =>
  api.get(`/movies/search?${query}`);

//Home
export const getHomeMovies = () => api.get(`/movies/get/home`);

//User auth
export const login = (formValues: FormData) =>
  api.post("/user/login", formValues);
export const signup = (formValues: FormData) =>
  api.post("/user/signup", formValues);
