import React, { useState, useEffect } from "react";
import "./moviehomelist.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { numFormatter } from "../../auxcomponents/functions/NumberFormat";
import { useSelector } from "react-redux";
import WatchlistForm from "../watchlist/WatchlistForm";

const MovieHomeList = ({ movie, index }) => {
  const [bgColor, setBgColor] = useState("rgb(200,200,200)");
  const [status, setStatus] = useState("Add");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { watchlist } = useSelector((state) => state.watchlist);
  let borderColor = null;

  useEffect(() => {
    setBgColor("rgb(200,200,200)");
    if (watchlist) {
      const wlFill = watchlist.filter((item) => item.movieid === movie.movieid);
      if (wlFill.length === 0) setStatus("Add");
      if (wlFill.length > 0) {
        switch (wlFill[0].status) {
          case "Watching":
            setBgColor("rgb(53, 255, 51)");
            setStatus("CW");
            break;
          case "Completed":
            setBgColor("rgb(79, 116, 227)");
            setStatus("CMPL");
            break;
          case "Plan to watch":
            setBgColor("rgb(204, 204, 204)");
            setStatus("PTW");
            break;
          case "On-hold":
            setBgColor("rgb(240, 230, 100)");
            setStatus("OH");
            break;
          case "Dropped":
            setBgColor("rgb(244, 100, 100)");
            setStatus("DRP");
            break;
          default:
            setBgColor("rgb(200,200,200)");
            setStatus("Add");
        }
      }
    }
    if (watchlist.length === 0) {
      setBgColor("rgb(200,200,200)");
      setStatus("Add");
    }
  }, [movie, watchlist]);

  return (
    <Box className="Box-moviehomelist">
      <Box className="moviehomelist-index">{index + 1}.</Box>
      <Box className="moviehomelist-item">
        <img
          className="moviehomelist-img"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
        <Box className="moviehomelist-title">
          <Link to={`/movies/${movie.movieid}`}>
            {movie.title.length > 25
              ? movie.title.slice(0, 25) + "..."
              : movie.title}
          </Link>
          <span>
            <PeopleAltIcon
              fontSize="small"
              sx={{ verticalAlign: "text-bottom" }}
            />{" "}
            {numFormatter(movie.popularity)}
          </span>
          <span>
            <StarBorderIcon
              fontSize="small"
              sx={{ verticalAlign: "text-bottom", color: "gold" }}
            />{" "}
            {movie.rating ? movie.rating : "N/A"}
          </span>
        </Box>
      </Box>
      <Box className="moviehomelist-status">
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            minWidth: "55px",
            padding: "2px 5px",
            color: bgColor ? "white" : "black",
            fontWeight: "bold",
            textTransform: "none",
            border: borderColor ? borderColor : "1px solid black",
            backgroundColor: bgColor ? bgColor : "white",
            textShadow: "1px 1px 1px black",
          }}
        >
          {status}
        </Button>
        <Modal
          open={open}
          onClose={(e) => {
            e.preventDefault();
            handleClose();
          }}
          aria-labelledby={"add" + movie.title}
          aria-describedby="formWatchlist"
        >
          <Box className="watchformmodal">
            <Box sx={{ width: "70vw", height: "90vh" }} component="div">
              <WatchlistForm
                movieid={parseInt(movie.movieid)}
                type={"movie"}
                handleCloseWatchForm={handleClose}
                title={movie.title}
                episodesTotal={1}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default MovieHomeList;
