import React,{useState} from 'react'
import './postcomment.css'
import DraftDisplay from '../../auxcomponents/input/DraftDisplay'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../../auxcomponents/avatar/Avatarfct';
import { Link } from 'react-router-dom';
import { Box,Avatar,ClickAwayListener,Button } from '@mui/material';
import moment from 'moment'
import { deleteCommUser } from '../../api';


const styles = {
  position: 'absolute',
  top: 28,
  right: 0,
  //left: 0,
  zIndex: 10,
  border: '1px solid',
  p: 1,
  bgcolor: 'pink',
  width:250,
};


const PostComm = ({postComment,setRefreshComm}) => {
  const {user}=useSelector(state=>state.user)
  const [open, setOpen] = useState(false);

  const handleDeleteComm = async () =>{
    deleteCommUser(postComment)
    .then(res=>{
      if(res.data.message==="Success"){
        setRefreshComm(true)
        console.log('ef')
      }
    })
    .catch(e=>console.log(e))
    
  }
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  if(postComment)
  return (<>
    {user && user.role==='admin'?
    <Box sx={{p:1,color:'red',fontSize:'1.2rem'}}>
    Comment id: {postComment.ucid}
    </Box>:<></>}
    <Box className='Box-postcomment'>
        
        <Box className='Box-postcomment-header'>
            <span>{moment(postComment.createdAt).format("Do MM YYYY, HH:mm")}</span>
            {user.username===postComment.User.username?
            <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box sx={{ position: 'relative' }}>
                <Button variant='text' sx={{color:'rgb(255, 208, 189)',fontSize:'0.8rem'}} onClick={handleClick}>
                  Delete comment
                </Button>
              {open ? (
              <Box sx={styles}>
                <span style={{fontSize:'0.9rem'}}>Are you sure you want to delete this comment?</span>
                <Button onClick={handleDeleteComm}>Yes</Button>
                <Button onClick={handleClickAway}>No</Button>
              </Box>
              ) : null}
              </Box>
            </ClickAwayListener>
            </div>
            :
            <></>}
        </Box>
        <Box className='Box-postcomment-comment'>
          <Box className='Box-postcomment-left'>
            <Avatar  {...stringAvatar(postComment.User.fullname)} aria-label="fullname"/>
            <Link to={`/profile/${postComment.User.username}`}>{postComment.User.username}</Link>
          </Box>
          <Box className='Box-postcomment-right'>
            <DraftDisplay field={postComment.comment_content} />
          </Box>
        </Box>
    </Box>
  </>
  )
  else 
  return (
    <div>Loading</div>
  )
}

export default PostComm