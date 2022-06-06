import React from 'react'
import './moviesearchlist.css'

const MovieSearchList = ({title,poster}) => {
  return (
    <div className='moviesearchlist-item'>
        <img className='moviesearchlist-img' src={`https://image.tmdb.org/t/p/original/${poster}`} alt={title}/>
        <div className='moviesearchlist-title'>{title}</div>
    </div>
  )
}

export default MovieSearchList