import React, {useState,useEffect} from 'react'
import './moviereview.css'
import moment from 'moment'
import { Card,CardHeader,CardContent,Avatar,IconButton,Typography,CardActions,Divider,Box,Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector,useDispatch } from 'react-redux';
import {actionLikeReview,actionDislikeReview} from '../../store/reviewSlice'
import { stringAvatar } from '../../auxcomponents/avatar/Avatarfct';
import { getLikesForReview } from '../../api';
import {numFormatter} from '../../auxcomponents/functions/NumberFormat'
import { Link } from 'react-router-dom';

const MovieReview = ({review}) => {
  const [show,setShow]=useState(false)
  const [liked,setLiked]=useState(null)
  const {likes} = useSelector(state=>state.review)
  const {user} =useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [likeCount,setLikeCount] = useState(null)
  const [dislikeCount,setDislikeCount] = useState(null)

  useEffect(()=>{
    async function getReviewLikes(){
      const res= await getLikesForReview(review.reviewid);
      const {likes,dislikes}=res.data
      setLikeCount(numFormatter(likes));
      setDislikeCount(numFormatter(dislikes));
   }     
    if(user.username===review.User.username)
        getReviewLikes()
  },[user,review])

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
    dispatch(actionDislikeReview(formData))
  }
  
  return (
    <Card sx={user.username===review.User.username?
      { minWidth: 300,p:0.5, marginInline:1, maxWidth:'100%' , border:'2px solid red',}
      :
      { minWidth: 300,p:0.5, marginInline:1, maxWidth:'100%'}}
     variant='outlined' className='moviereview-card'>
      <CardHeader
        avatar={
          <Avatar  {...stringAvatar(review.User.fullname)} aria-label="fullname"/>
        }
        action={user?
        <>
        <IconButton aria-label="like" onClick={likeReview} sx={liked && liked.liked===true?{color:'orange'}:{}}>
          <ThumbUpIcon />
        </IconButton>
        {user.username===review.User.username?<span className='moviereview-likecount'>{likeCount}</span>:<></>}
        <IconButton aria-label="dislike" onClick={dislikeReview} sx={liked && liked.liked===false?{color:'orange'}:{}}>
          <ThumbDownIcon />
        </IconButton>
        {user.username===review.User.username?<span className='moviereview-likecount'>{dislikeCount}</span>:<></>}
        </>:<></>
        }
        title={<Link to={`/profile/${review.User.username}`}>{review.User.username}</Link>}
        subheader={moment(review.createdAt).format("MMM Do YYYY")}
      />
      <Divider flexItem/>
      <CardContent>
        <Box component='div' className='Box-moviereview-draftdisplay' maxHeight={show===true?'none':140} sx={{bgcolor:'white'}}>
          <DraftDisplay field={review.content} />
        </Box>
        <Box>
          {new Date(review.createdAt).getTime()<new Date(review.updatedAt).getTime()?
          <>Updated at {moment(review.updatedAt).format("MMM Do YYYY")}</>:<></>}
        </Box>
      </CardContent>
      <Divider flexItem/>
      <CardActions disableSpacing className="moviereview-actions">
        <Box component='div'>
        <Typography variant='h6' color="text.secondary">
          {review.likeCount? review.likeCount>1? `${review.likeCount} people liked this review`: '1 person liked this review':'Be the first to like this review'}
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