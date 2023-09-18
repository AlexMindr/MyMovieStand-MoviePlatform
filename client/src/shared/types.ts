import { RawDraftContentState } from "react-draft-wysiwyg";

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

export interface MovieImageObjType {
  posters: MovieImageObjPropsType[];
  logos: MovieImageObjPropsType[];
  backdrops: MovieImageObjPropsType[];
}

export interface MovieImageObjPropsType {
  aspect_ratio?: number;
  file_path: string;
  height?: number;
  iso_639_1?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  width?: number;
}

export interface MovieCreditsObjType {
  cast: MovieCastPropsType[];
  crew: MovieCrewPropsType[];
}

interface MovieCreditsPeopleImageProps {
  adult: boolean;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export interface MovieCastPropsType extends MovieCreditsPeopleImageProps {
  cast_id: number;
  character: string;
  order: number;
}
export interface MovieCrewPropsType extends MovieCreditsPeopleImageProps {
  department: string;
  job: string;
}

export interface UserType {
  fullname: string;
  username: string;
  firstName: string;
  lastName: string;
}
export interface ReviewType {
  User: UserType;
  content: RawDraftContentState;
  createdAt: Date;
  likeCount: number;
  movieid: number;
  reviewid: number;
  updatedAt: Date;
}
