import React, { useState, useEffect } from "react";
import "./movielist.css";
import moment from "moment";
import {
  Divider,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import {
  PersonOutline,
  StarBorderPurple500Outlined,
} from "@mui/icons-material";
import { StyledEngineProvider } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import WatchlistForm from "../watchlist/WatchlistForm";
import { numFormatter } from "../../auxcomponents/functions/NumberFormat";

const MovieList = ({
  status,
  adult,
  uscertification,
  duration,
  genres,
  overview,
  posterPath,
  releaseDate,
  title,
  movieid,
  trailer,
  keywords,
  rating,
  popularity,
  children,
}) => {
  const [bgColor, setBgColor] = useState("rgb(230,230,230,0.7)");
  const [open, setOpen] = useState(false);
  const [openWatchForm, setOpenWatchForm] = useState(false);
  const [openLoginRedirect, setOpenLoginRedirect] = useState(false);
  const [wlData, setWlData] = useState(null);
  const { watchlist } = useSelector((state) => state.watchlist);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenWatchForm = () => setOpenWatchForm(true);
  const handleCloseWatchForm = () => setOpenWatchForm(false);
  const handleOpenLoginRedirect = () => setOpenLoginRedirect(true);
  const handleCloseLoginRedirect = () => setOpenLoginRedirect(false);

  useEffect(() => {
    setBgColor("rgb(230,230,230,0.7)");
    if (watchlist) {
      const wlFill = watchlist.filter((item) => item.movieid === movieid);
      if (wlFill.length === 0) setWlData(null);
      if (wlFill.length > 0) {
        setWlData({ ...wlFill[0] });
        switch (wlFill[0].status) {
          case "Watching":
            setBgColor("rgb(153, 255, 51,0.7)");
            break;
          case "Completed":
            setBgColor("rgb(79, 116, 227,0.7)");
            break;
          case "Plan to watch":
            setBgColor("rgb(204, 204, 204)");
            break;
          case "On-hold":
            setBgColor("rgb(240, 230, 140,0.7)");
            break;
          case "Dropped":
            setBgColor("rgb(244, 138, 160,0.7)");
            break;
          default:
            setBgColor("rgb(230,230,230,0.7)");
        }
      }
    }
  }, [movieid, watchlist]);

  return (
    <StyledEngineProvider injectFirst>
      <Card className="card" sx={{ bgcolor: bgColor }}>
        {/*de pus culoare cand adaugam in lista la element etc.  */}
        <Typography className="title" variant="h4">
          <Link to={`/movies/${movieid}`}>
            {title.length > 40 ? title.substring(0, 40) + "..." : title}
          </Link>
        </Typography>

        <Divider variant="horizontal" flexItem>
          {trailer ? (
            <>
              <Button
                onClick={handleOpen}
                className="trailer-movielist"
                variant="contained"
              >
                PV
              </Button>
              <Modal
                open={open}
                onClose={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
                aria-labelledby={title}
                aria-describedby="trailer"
              >
                <Box className="trailermodal">
                  <Typography
                    sx={{ width: "90vw", height: "90vh" }}
                    component="iframe"
                    src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1&wmode=opaque&autoplay=1`}
                  />
                </Box>
              </Modal>
            </>
          ) : (
            <Button className="trailer-movielist" variant="contained" disabled>
              PV
            </Button>
          )}
        </Divider>

        <Box component="div" className="overlay">
          <Typography
            className={uscertification ? "movielist-certification" : ""}
            variant="subtitle1"
            component="div"
          >
            {adult ? "Adult movie" : uscertification ? uscertification : "-"}
          </Typography>
          <Typography className="date" variant="subtitle1" component="div">
            {releaseDate ? moment(releaseDate).format("MMM YYYY") : "TBA"}
          </Typography>
          <Divider id="divi" orientation="vertical" variant="middle" flexItem />
          <Typography variant="subtitle1" component="div">
            Movie
          </Typography>
          <Typography variant="subtitle1" component="div">
            {parseInt(duration) > 0 ? (
              <>
                {Math.round(parseInt(duration) / 60)}h {parseInt(duration) % 60}
                min
              </>
            ) : (
              "-"
            )}
          </Typography>
        </Box>

        <Box component="div" className="genres-movielist">
          {genres.map((genre) => (
            <Box key={genre.genreid}>{genre.name}</Box>
          ))}
        </Box>

        <CardContent className="description">
          <CardMedia
            component="img"
            className="media"
            image={`https://image.tmdb.org/t/p/original/${posterPath}`}
            title={title}
          />
          <Typography
            className="text"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {overview ? overview : <em>No synopsis has been added</em>}
          </Typography>
        </CardContent>

        <Box className="bottom-card" component="div">
          <Box component="div" className="bottom-button">
            {user ? (
              <>
                {wlData ? (
                  <>
                    <Button
                      className="cardButton"
                      variant="contained"
                      onClick={handleOpenWatchForm}
                    >
                      &nbsp;{wlData.status}&nbsp;
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton
                      sx={{ color: "rgb(53, 30, 255)", p: 0 }}
                      className="cardButton"
                      onClick={handleOpenWatchForm}
                    >
                      <AddCircleIcon fontSize="small" className="icn" />
                    </IconButton>
                  </>
                )}

                <Modal
                  open={openWatchForm}
                  onClose={(e) => {
                    e.preventDefault();
                    handleCloseWatchForm();
                  }}
                  aria-labelledby={"add" + title}
                  aria-describedby="formWatchlist"
                >
                  <Box className="watchformmodal">
                    <Box sx={{ width: "70vw", height: "90vh" }} component="div">
                      <WatchlistForm
                        movieid={parseInt(movieid)}
                        type={"movie"}
                        handleCloseWatchForm={handleCloseWatchForm}
                        title={title}
                      />
                    </Box>
                  </Box>
                </Modal>
                {wlData && wlData.rating ? (
                  <div className="movielist-userscore">
                    <div className="movielist-userscore-content">
                      {wlData.rating === 10 ? (
                        wlData.rating
                      ) : (
                        <>&nbsp;{wlData.rating}</>
                      )}
                      &nbsp;
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <IconButton
                  sx={{ color: "rgb(53, 30, 255)", p: 0 }}
                  className="cardButton"
                  onClick={handleOpenLoginRedirect}
                >
                  <AddCircleIcon fontSize="small" />
                </IconButton>
                <Modal
                  open={openLoginRedirect}
                  onClose={(e) => {
                    e.preventDefault();
                    handleCloseLoginRedirect();
                  }}
                  aria-labelledby={"login"}
                  aria-describedby="link-login"
                >
                  <Box className="watchformmodal">
                    <Box
                      sx={{
                        width: "70vw",
                        height: "50vh",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                      component="div"
                    >
                      <Link to="/login" state={{ from: location }}>
                        Login into your account to add movie to your list
                      </Link>
                    </Box>
                  </Box>
                </Modal>
              </>
            )}
          </Box>
          <Box component="div" className="bottom-info">
            <Box component="div">
              <PersonOutline className="icn" fontSize="small" />
              <span>{popularity ? numFormatter(popularity) : "N/A"}</span>
            </Box>
            <Box component="div">
              <StarBorderPurple500Outlined
                className="icn"
                fontSize="small"
                sx={{ color: "orange" }}
              />
              <em>{rating ? rating : "N/A"}</em>
            </Box>
          </Box>
        </Box>
      </Card>
    </StyledEngineProvider>
  );
};

export default MovieList;
