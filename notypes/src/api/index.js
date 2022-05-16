import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5001" });
const tmdb = axios.create({baseURL: "https://api.themoviedb.org/3/movie"})
api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getMovie = (id) => api.get(`/movies/movie=${id}`);
export const getMovies = (page)  => api.get(`/movies/page=${page}`)
export const getMoviesFiltered = (page,query)  => api.get(`/movies/page=${page}/filter/?${query}`)


export const verify = () => api.get("/user/verify");
export const getProfile = (username) => api.get(`/user/profile/${username}`);
export const getSimpleProfile = () => api.get(`/user/myprofile`);
export const login = (formValues) => api.post("/user/login", formValues);
export const signup = (formValues) => api.post("/user/signup", formValues);
export const update = (formValues) => api.put("/user/update", formValues);


export const getFavouritesProfile = (username) => api.get(`/watchlist/fav/u/${username}`);
export const getFavourites = () => api.get("/watchlist/fav/myfavourites");
export const getWatchlist = (username) => api.get(`/watchlist/${username}`);
export const getWatchlistInit = () => api.get("/watchlist");
export const createWatchlistItem = (formValues) => api.post("/watchlist",formValues);
export const updateWatchlistItem = (formValues) => api.put("/watchlist",formValues);
export const addFavourite = (formValues) => api.put("/watchlist/addfav",formValues);
export const remFavourite = (formValues) => api.put("/watchlist/remfav",formValues);
export const deleteWatchlistItem = (formValues) => api.delete("/watchlist",formValues);

export const getGenres = () => api.get(`/genres`);

export const addNotification = (content) => api.post("/notifications/add",content)
export const getNotification = () => api.get("/notifications/get")
export const deleteNotification = (deleteIds) => api.delete("/notifications/delete",deleteIds)
export const updateNotification = (updateId) => api.put("/notifications/update",updateId)


//external api
const apikey ='api_key=d05a8d2156e4230aded1c48bf6f75b82'

export const getCredits = (id) => tmdb.get(`/${id}/credits?${apikey}`);
export const getImages = (id) => tmdb.get(`/${id}/images?${apikey}`);

