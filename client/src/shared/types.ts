export interface GenreType {
  name: string;
  genreid: number;
}

export interface MovieType {
  movieid: number;
  adult: false;
  backdrop_path: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  tmdb_id: number;
  language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
  revenue: number;
  duration: string;
  status: string;
  title: string;
  trailer: string;
  keywords: string;
  popularity: number;
  uscertification: string;
  rating: number;
  Genres: GenreType[];
}

export interface SearchMovieType {
  movieid: number;
  poster_path: string;
  title: string;
}

export interface QueryFilterType {
  page?: string;
  order?: string;
  title?: string;
  sort?: string;
  genres?: string;
}
