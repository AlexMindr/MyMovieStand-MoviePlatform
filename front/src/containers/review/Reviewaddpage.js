import React, { useEffect, useState } from "react";
import "./reviewaddpage.css";
import Paper from "@mui/material/Paper";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { ReviewAdd } from "../../components";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api";
import { useNavigate } from "react-router-dom";

const Reviewaddpage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getMoviebck() {
      const res = await getMovie(parseInt(id));
      if (res.data) setMovie(res.data);
      else {
        setErr("Movie doesn't exist!");
        navigate("/error");
      }
    }
    getMoviebck();
  }, [id, navigate]);

  return (
    <StyledEngineProvider injectFirst>
      <Paper elevation={2} className="container-reviewadd">
        {movie && err === null ? (
          <ReviewAdd movieid={movie.movieid} title={movie.title} />
        ) : (
          <div>{err}</div>
        )}
      </Paper>
    </StyledEngineProvider>
  );
};

export default Reviewaddpage;
