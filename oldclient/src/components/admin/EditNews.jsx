import React, { useState } from "react";
import "./editnews.css";
import DraftTextArea from "../../auxcomponents/input/DraftTextarea";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updateNews,getPostContent } from "../../api";
import Input from "../../auxcomponents/input/Input";

const EditNews = () => {
  //const [postid,setPostId]=useState('')
  const [nopost,setNoPost]=useState(true)
  const [formData, setFormData] = useState({movieid:'',postid:'',title:'',content:null});
  const [formError, setFormError] = useState(null);
  const [formSucc, setFormSucc] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateNews(formData)
    .then((res) => {
      setFormSucc(res.data.message)
      //navigate(`/news/movie/${formData.movieid}/${formData.postid}`);
      setNoPost(true)
      setFormData({movieid:'',postid:'',title:'',content:null})  
    })
      .catch((e) => setFormError(e.response.data.message));
  };

  const clearChanges = () => {
    navigate(`/news/movie/${formData.movieid}/${formData.postid}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeContent = (newValue) => {
    setFormData({ ...formData, content: newValue });
  };
  
  const getContent = async () => {
    
      const res = await getPostContent(formData.postid);
      const post = res.data
      setFormData({movieid:post.movieid,postid:post.postid,title:post.title,content:post.content});
      setNoPost(false)
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1, p: 2 }}
        component="form"
        onSubmit={handleSubmit}
        className="newsedit-form"
      >
        <Grid container spacing={2} className="newsedit-form-grid">
          
        {formError ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="red">
                {formError}
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
          {formSucc?
        <Grid item xs={12}>
            <Typography variant='h6' color='blue'>{formSucc}</Typography>
        </Grid>
        :
        <></>
        }
          {nopost?
          <><Grid item xs={12}>
            <Input name='postid' label='Postid of the news you want to edit' required={true} value={formData.postid} handleChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained"
              color="primary"
              className="submit-newsedit"
              onClick={getContent}
            >
               Get 
            </Button>
          </Grid>
          </>
          :<>
          <Grid item xs={12}>
            <Input name='title' label='Title' required={true} value={formData.title} handleChange={handleChange}/>
          </Grid>

          <Grid item xs={12} className="newsedit-textarea">
              <DraftTextArea
                field={formData.content}
                setField={handleChangeContent}
                placeholder={"Write the news here"}
                ok={1}
                textMaxLength={5000}
              />
             
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-newsedit"
            >
               Update review
            </Button>
            <Button onClick={clearChanges} variant="text">
              Cancel
            </Button>
          </Grid>
          </>
          }
        </Grid>
      </Box>
    </>
  );
};


export default EditNews