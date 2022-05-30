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


export const deleteUserAdmin = (username) => api.delete(`/user/delete/${username}`);
//TODO verify below
export const addNotification = (formData) => api.post("/notifications/add",formData)
export const addGlobalNotification = (formData) => api.post("/notifications/add/global",formData)
export const deletePostAdmin = (postid) => api.delete(`/posts/admin/delete/${postid}`);
export const restrictPostAdmin = (formData) => api.put(`/posts/admin/restrict/`,formData);
export const updatePostAdmin = (formData) => api.put(`/posts/update`,formData);



export const addPost = (formData) => api.post('/posts/add/post',formData);
export const addComm = (formData) => api.post('/posts/add/comment',formData);
export const getMoviePosts = (movieid,page,count) => api.get(`posts/get/movie/${movieid}/page=${page}/count=${count}`);
export const getPostContent = (postid) => api.get(`posts/get/post/${postid}`);
export const getPostComments = (postid,page,count) => api.get(`posts/get/post/${postid}/comments/page=${page}/count=${count}`);
export const getUserPosts = (username,page,count) => api.get(`/posts/get/posts/user/${username}/page=${page}/count=${count}`);
export const getUserComments = (username,page,count) => api.get(`/posts/get/comments/user/${username}/page=${page}/count=${count}`);
export const getHomePosts = () => api.get('/posts/get/home');
//TODO verify
export const deletePostUser = (postid) => api.delete("posts/delete",postid);


export const getLikesForReview = (reviewid) => api.get(`/reviews/get/likes/${reviewid}`);
export const getReviewOfMovie = (movieid) => api.get(`/reviews/get/moviereview/${movieid}`);
export const getUserReviewsAndLikes = () => api.get(`/reviews/get/userinit`);
export const getUserReviews = (username,page,count) => api.get(`/reviews/get/user/${username}/page=${page}/count=${count}`);
export const getHomeReviews = () => api.get('/reviews/get/home');
export const getMovieReviews = (movieid,page,count) => api.get(`/reviews/get/movie/${movieid}/page=${page}/count=${count}`);
export const addReview = (formData) => api.post('/reviews/add',formData);
export const updateReview = (formData) => api.put('/reviews/update',formData);
export const likeReview = (formData) => api.put(`/reviews/like`,formData);
export const dislikeReview = (formData) => api.put(`/reviews/dislike`,formData);
export const deleteReview = (movieid) => api.delete(`/reviews/delete/${movieid}`);


export const getMoviesSimpleFilter = (page,query) => api.get(`/movies/page=${page}/search/?${query}`)
export const getHomeMovies = ()  => api.get(`/movies/get/home`)
export const getMovie = (id) => api.get(`/movies/movie=${id}`);
export const getMovies = (page)  => api.get(`/movies/page=${page}`)
export const getMoviesFiltered = (page,query)  => api.get(`/movies/page=${page}/filter/?${query}`)
export const updateMovie = (formData) => api.put(`/movies/update/movie`,formData)
export const updatePopularityAndRating = () => api.get(`/movies/update/all`)



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

export const getNotification = () => api.get("/notifications/get")
export const deleteNotification = (deleteIds) => api.delete("/notifications/delete",deleteIds)
export const updateNotification = (updateId) => api.put("/notifications/update",updateId)


//external api
const apikey ='api_key=d05a8d2156e4230aded1c48bf6f75b82'

export const getCredits = (id) => tmdb.get(`/${id}/credits?${apikey}`);
export const getImages = (id) => tmdb.get(`/${id}/images?${apikey}`);

