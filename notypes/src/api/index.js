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

export const getMovie = (id) => api.get(`/movies/${id}`);
export const getMovies = ()  => api.get(`/movies/`)

export const login = (formValues) => api.post("/user/login", formValues);
export const signup = (formValues) => api.post("/user/signup", formValues);

//const apikey ='api_key=d05a8d2156e4230aded1c48bf6f75b82'
//const url=`https://api.themoviedb.org/3/movie/550?${apikey}`
//api_key: 'd05a8d2156e4230aded1c48bf6f75b82'
//export const getMovie = (id) => tmdb.get(`/${id}?${apikey}` );



