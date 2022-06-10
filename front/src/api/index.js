import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5001" });
const tmdb = axios.create({ baseURL: "https://api.themoviedb.org/3/movie" });
api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getMovieRecommendations = (movieid) =>
  api.post(`/recommendations/movie/${movieid}`);
export const getUserRecommendations = () => api.post(`/recommendations/user`);

export const deleteUserAdmin = (username) =>
  api.delete(`/user/delete/${username}`);
export const addNotification = (formData) =>
  api.post("/notifications/add", formData);
export const addGlobalNotification = (formData) =>
  api.post("/notifications/add/global", formData);
export const deletePostAdmin = (postid) =>
  api.delete(`/posts/admin/post/delete/${postid}`);
export const restrictPostAdmin = (formData) =>
  api.put(`/posts/admin/post/restrict`, formData);
export const deleteCommAdmin = (commid) =>
  api.delete(`/posts/admin/comm/delete/${commid}`);
export const restrictCommAdmin = (formData) =>
  api.put(`/posts/admin/comm/restrict`, formData);
export const deleteReviewAdmin = (reviewid) =>
  api.delete(`/reviews/admin/delete/${reviewid}`);
export const restrictReviewAdmin = (formData) =>
  api.put(`/reviews/admin/restrict`, formData);
export const addNews = (formData) =>
  api.post(`/posts/admin/news/add`, formData);
export const updateNews = (formData) =>
  api.put(`/posts/admin/news/edit`, formData);

export const addPost = (formData) => api.post("/posts/add/post", formData);
export const addComm = (formData) => api.post("/posts/add/comment", formData);
export const getMoviePosts = (movieid, page, count) =>
  api.get(`posts/get/movie/${movieid}/page=${page}/count=${count}`);
export const getPostContent = (postid) => api.get(`posts/get/post/${postid}`);
export const getPostComments = (postid, page, count) =>
  api.get(`posts/get/post/${postid}/comments/page=${page}/count=${count}`);
export const getUserPosts = (username, page, count) =>
  api.get(`/posts/get/posts/user/${username}/page=${page}/count=${count}`);
export const getUserComments = (username, page, count) =>
  api.get(`/posts/get/comments/user/${username}/page=${page}/count=${count}`);
export const getHomePosts = () => api.get("/posts/get/home");
export const getHomeNews = () => api.get("/posts/get/news/home");
export const getNews = (page) => api.get(`/posts/get/news/all/page=${page}`);
export const deletePostUser = (formData) =>
  api.put("posts/user/post/delete", formData);
export const deleteCommUser = (formData) =>
  api.put("posts/user/comm/delete", formData);

export const getLikesForReview = (reviewid) =>
  api.get(`/reviews/get/likes/${reviewid}`);
export const getReviewOfMovie = (movieid) =>
  api.get(`/reviews/get/moviereview/${movieid}`);
export const getUserReviewsAndLikes = () => api.get(`/reviews/get/userinit`);
export const getUserReviews = (username, page, count) =>
  api.get(`/reviews/get/user/${username}/page=${page}/count=${count}`);
export const getHomeReviews = () => api.get("/reviews/get/home");
export const getMovieReviews = (movieid, page, count) =>
  api.get(`/reviews/get/movie/${movieid}/page=${page}/count=${count}`);
export const addReview = (formData) => api.post("/reviews/add", formData);
export const updateReview = (formData) => api.put("/reviews/update", formData);
export const likeReview = (formData) => api.put(`/reviews/like`, formData);
export const dislikeReview = (formData) =>
  api.put(`/reviews/dislike`, formData);
export const deleteReview = (movieid) =>
  api.delete(`/reviews/delete/${movieid}`);

export const getMoviesSimpleFilter = (page, query) =>
  api.get(`/movies/page=${page}/search/?${query}`);
export const getHomeMovies = () => api.get(`/movies/get/home`);
export const getMovie = (id) => api.get(`/movies/movie=${id}`);
export const getMovies = (page) => api.get(`/movies/page=${page}`);
export const getMoviesFiltered = (page, query) =>
  api.get(`/movies/page=${page}/filter/?${query}`);

export const populateMovies = (formData) =>
  api.post(`/movies/populate`, formData);
export const addMovie = (formData) => api.post(`/movies/create`, formData);
export const updateMovie = (formData) => api.put(`/movies/update`, formData);

export const updatePopularityAndRating = () =>
  api.get(`/movies/update/popularity/all`);

export const verify = () => api.get("/user/verify");
export const getProfile = (username) => api.get(`/user/profile/${username}`);
export const getSimpleProfile = () => api.get(`/user/myprofile`);
export const login = (formValues) => api.post("/user/login", formValues);
export const signup = (formValues) => api.post("/user/signup", formValues);
export const update = (formValues) => api.put("/user/update", formValues);
export const reset = (formValues) => api.put("/user/reset", formValues);
export const change = (formValues) => api.put("/user/change", formValues);

export const getFavouritesProfile = (username) =>
  api.get(`/watchlist/fav/u/${username}`);
export const getFavourites = () => api.get("/watchlist/fav/myfavourites");
export const getWatchlist = (username) => api.get(`/watchlist/${username}`);
export const getWatchlistInit = () => api.get("/watchlist");
export const createWatchlistItem = (formValues) =>
  api.post("/watchlist", formValues);
export const updateWatchlistItem = (formValues) =>
  api.put("/watchlist", formValues);
export const addFavourite = (formValues) =>
  api.put("/watchlist/addfav", formValues);
export const remFavourite = (formValues) =>
  api.put("/watchlist/remfav", formValues);
export const deleteWatchlistItem = (movieid) =>
  api.delete(`/watchlist/delete/${movieid}`);

export const getGenres = () => api.get(`/genres/get`);
export const updateGenres = () => api.put(`/genres/update`);
export const populateGenres = () => api.post(`/genres/populate`);

export const addNotificationUser = (formData) =>
  api.post("/notifications/add", formData);
export const getNotification = () => api.get("/notifications/get");
export const getNotificationPag = (page) =>
  api.get(`/notifications/get/page=${page}`);
export const deleteNotification = (notificationid) =>
  api.delete(`/notifications/delete/${notificationid}`);
export const updateNotification = (notificationid) =>
  api.put("/notifications/update", { notificationid });

//external api
const apikey = "api_key=d05a8d2156e4230aded1c48bf6f75b82";

export const getCredits = (id) => tmdb.get(`/${id}/credits?${apikey}`);
export const getImages = (id) => tmdb.get(`/${id}/images?${apikey}`);
