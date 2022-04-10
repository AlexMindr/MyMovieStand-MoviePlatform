import React from 'react'
import './moviepage.css'
import {Movie} from '../../components'
import { useParams } from 'react-router-dom'

const Moviepage = () => {
  const {id}=useParams()
  console.log(id);
  return (
    <>
    <Movie movieid={id}/>
    </>
  )
}

export default Moviepage;