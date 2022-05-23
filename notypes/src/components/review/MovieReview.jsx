import React, {useState,useEffect} from 'react'
import './moviereview.css'
import moment from 'moment'
import { Card,CardHeader,CardContent,Avatar,IconButton,Typography,CardActions,Divider,Box,Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector,useDispatch } from 'react-redux';
import {actionLikeReview,actionDislikeReview} from '../../store/reviewSlice'

const MovieReview = ({review}) => {
  const [show,setShow]=useState(false)
  const [liked,setLiked]=useState(null)
  const {likes} = useSelector(state=>state.review)
  const dispatch = useDispatch()


  useEffect(()=>{
    if(likes){
      const item =likes.filter(item=>item.reviewid===review.reviewid)
      if (item.length>0)
        setLiked(item[0])
    }
  },[review,likes])

  const toggleShowDisplay = (e) => {
    setShow(!show)
  }

  const likeReview = () => {
    const formData={reviewid:review.reviewid,liked:true}
    dispatch(actionLikeReview(formData))
  }
  const dislikeReview = () => {
    const formData={reviewid:review.reviewid,liked:false}
    dispatch(actionLikeReview(formData))
  }
  
  return (
    <Card flexItem sx={{ minWidth: 300,p:0.5, marginInline:1}} variant='outlined' className='moviereview-card'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:'red' }} aria-label="username">
            {review.User.username}
          </Avatar>
        }
        action={
        <>
        <IconButton aria-label="like" onClick={likeReview} sx={liked && liked.liked===true?{color:'orange'}:{}}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="dislike" onClick={dislikeReview} sx={liked && liked.liked===false?{color:'orange'}:{}}>
          <ThumbDownIcon />
        </IconButton>
        </>
        }
        title={review.User.username}
        subheader={moment(review.createdAt).format("MMM Do YYYY")}
      />
      <Divider flexItem/>
      <CardContent>
        <Box component='div' className='Box-moviereview-draftdisplay' maxHeight={show===true?'none':140}>
          <DraftDisplay field={review.content} />
        </Box>
      </CardContent>
      <Divider flexItem/>
      <CardActions disableSpacing className="moviereview-actions">
        <Box component='div'>
        <Typography variant='h6' color="text.secondary">
          {/* review.likes tbd >1? review.likes people liked this review: 1 person liked this review*/}
          review.likes people liked this review
        </Typography>
        </Box>
        <Box component='div'>
          <Button aria-label="display" sx={{color:'red'}} onClick={toggleShowDisplay}>
              {show===true?'Show less':'Show more'}
            </Button>  
        </Box>
      </CardActions>
    </Card>
  )
}

export default MovieReview