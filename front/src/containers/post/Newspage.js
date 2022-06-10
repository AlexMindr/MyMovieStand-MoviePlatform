import React,{useState,useEffect} from 'react'
import './newspage.css'
import { getNews } from "../../api";
import {
  Grid,
  CircularProgress,
  Pagination,
  Box,
  Typography,
  StyledEngineProvider,
  Paper,
} from "@mui/material";
import { NewsTitle } from "../../components";


const Newspage = () => {
    const [newsList, setNewsList] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
   
    const pageChange = (event, value) => {
      setPage(value);
    };
  
   
    useEffect(() => {
      async function getData() {
        const res = await getNews( page, 10);
        setNewsList(res.data.posts);
        setTotalPages(res.data.totalPages);
      }
  
      getData();
    }, [page]);
  
    return (
      <StyledEngineProvider injectFirst>
        <Paper elevation={2}>
              <Typography component="h2" variant="h3" className="Container-title">
                News
              </Typography>
              <Box className="allnews-container">
                {newsList === null ? (
                  <div className="loading-allnews">
                    <CircularProgress />
                  </div>
                ) : newsList.length >= 1 ? (
                  <Box sx={{ flexGrow: 1 }} className="allnews-box">
                    <Grid container rowGap={1} columnSpacing={"10px"}>
                      {newsList.map((news) => (
                        <Grid
                          item
                          xs={12}
                          key={news.newsid}
                          className="allnews-news"
                        >
                          <NewsTitle news={news} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <div className="loading-allnews">
                    <Typography
                      variant="h4"
                      sx={{ fontStyle: "oblique", color: "#a3abb3" }}
                    >
                      No news have been added yet
                    </Typography>
                  </div>
                )}
              </Box>
         
          {newsList && newsList.length >= 1 ? (
            <div className="allnews-pagination">
              <Pagination
                count={totalPages}
                page={page ? page : 1}
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={pageChange}
              />
            </div>
          ) : (
            <></>
          )}
        </Paper>
      </StyledEngineProvider>
    );
  };
  


export default Newspage