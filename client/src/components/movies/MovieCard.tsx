import { MovieType } from "@/shared/types";
import moment from "moment";
import { useSelector } from "react-redux";
import numFormatter from "@/shared/functions/numberFormat";
//import WatchlistForm from "../watchlist/WatchlistForm";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material";
import { useState } from "react";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";

type Props = {
  movie: MovieType;
};

const trailerButtonStyle = {
  fontSize: "0.8rem",
  borderRadius: "0.5rem",
  minWidth: "2rem",
  p: "1px 0.75rem",
  fontWeight: "600",
};

const MovieCard = ({ movie }: Props) => {
  const {
    adult,
    uscertification,
    duration,
    Genres,
    overview,
    poster_path,
    release_date,
    title,
    movieid,
    trailer,
    rating,
    popularity,
  } = movie;
  const theme = useTheme();
  const [openTrailer, setOpenTrailer] = useState(false);
  const [openWLForm, setOpenWLForm] = useState(false);
  //TO BE REMOVED
  const user = { username: "adrianus", fullname: "gabi andr" };
  const wlData: { rating: number; status: string } = {
    rating: 1,
    status: "ON-Hold",
  };
  return (
    <Card
      component="li"
      //      className="card"
      sx={{
        bgcolor: theme.palette.watchlistBg.main,
        display: "block",
        border: "0.1rem solid",
        maxWidth: "320px",
        position: "relative",
        borderColor: theme.palette.grey[100],
        height: "100%",
        // minHeight: "100%",
        listStyleType: "none",
        textDecoration: "none",
      }}
    >
      <Typography
        className="title"
        variant="h3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        height="2.75rem"
        minHeight="2.75rem"
        fontSize="1.2rem"
        sx={{
          "& a": {
            textAlign: "center",
            width: "90%",
            textWrap: "balance",
          },
        }}
      >
        <Link to={`/movies/${movieid}`}>
          {title.length > 40 ? title.substring(0, 40) + "..." : title}
        </Link>
      </Typography>

      <Divider flexItem>
        {trailer ? (
          <>
            <Button
              onClick={() => setOpenTrailer(true)}
              sx={{
                ...trailerButtonStyle,
                bgcolor: theme.palette.primary[600],
                color: theme.palette.primary.contrastText,
              }}
              //className="trailer-movielist"
              variant="contained"
            >
              PV
            </Button>
            <Modal
              open={openTrailer}
              onClose={() => setOpenTrailer(false)}
              aria-labelledby={title}
              aria-describedby="trailer"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                bgcolor={theme.palette.grey[800]}
                border="5px solid black"
                boxShadow={24}
                p="5px"
                sx={{ transform: "translate(-50%,-50%)" }}
                //className="trailermodal"
              >
                <Box
                  width="80dvw"
                  height="80dvh"
                  component="iframe"
                  src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&enablejsapi=1`}
                />
              </Box>
            </Modal>
          </>
        ) : (
          <Button
            sx={{
              ...trailerButtonStyle,
              bgcolor: theme.palette.grey[200],
              ":disabled": {
                color: theme.palette.grey[400],
              },
            }}
            //className="trailer-movielist"
            variant="contained"
            disabled
          >
            PV
          </Button>
        )}
      </Divider>

      <FlexBox
        component="div"
        justifyContent="space-around"
        minHeight="25px"
        m="0.1rem 0.2rem"
        sx={{
          "&>div": {
            fontSize: "0.9rem",
            fontWeight: "500",
            textAlign: "center",
          },
        }}
        //className="overlay"
      >
        <Typography
          // borderRadius="2px"
          // minWidth="20px"
          flexBasis="13%"
          color={theme.palette.secondary[400]}
          sx={{
            textShadow: `1px 1px 1px ${theme.palette.secondary[200]}`,
          }}
          //className={uscertification ? "movielist-certification" : ""}
          variant="subtitle1"
          component="div"
        >
          {adult ? "Adult" : uscertification ? uscertification : "-"}
        </Typography>
        <Typography
          //className="date"
          //textAlign={"center"}
          color={theme.palette.tertiary[600]}
          variant="subtitle1"
          component="div"
        >
          {release_date ? moment(release_date).format("MMM YYYY") : "TBA"}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
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
            <>-</>
          )}
        </Typography>
      </FlexBox>

      <FlexBoxCenter
        component="div"
        flexWrap="wrap"
        columnGap="4px"
        rowGap="2px"
        // width="100%"
        minHeight="3rem"
        bgcolor={theme.palette.secondary[100]}
        //className="genres-movielist"
      >
        {Genres?.map((genre) => (
          <Box
            key={genre.genreid}
            bgcolor={theme.palette.tertiary[700]}
            p="2px 6px"
            borderRadius="30px"
            fontSize="0.8rem"
            // textTransform="none"
            color={theme.palette.grey[100]}
            fontWeight="500"
          >
            {genre.name}
          </Box>
        ))}
      </FlexBoxCenter>

      <CardContent
        sx={{
          display: "flex",
          maxWidth: "100%",
          border: `1px solid ${theme.palette.primary[400]}`,
          p: "1px",
          minHeight: "12rem",
        }}
        //className="description"
      >
        <CardMedia
          component="img"
          //className="media"

          image={`https://image.tmdb.org/t/p/original/${poster_path}`}
          title={title}
          sx={{
            height: "12rem",
            flexBasis: "45%",
          }}
        />
        <Typography
          //className="text"
          variant="body2"
          color={theme.palette.grey[600]}
          component="p"
          flexBasis="55%"
          overflow="hidden"
          height="12rem"
          textAlign="justify"
          sx={{
            marginInline: "0.5rem",
            hyphens: "auto",
            textIndent: "10%",
            "&:hover": {
              // paddingRight: "3px",
              overflow: "visible",
              overflowX: "hidden",
              overflowY: "scroll",
            },
          }}
        >
          {overview ? overview : <em>Synopsis unavailable</em>}
        </Typography>
      </CardContent>

      <FlexBox
        //className="bottom-card"
        justifyContent="space-around"
        m="0.25rem 0.1rem"
        minHeight="25px"
        component="div"
      >
        <Box
          component="div"
          flexBasis="50%"
          display="flex"
          alignItems="center"
          //className="bottom-button"
        >
          {wlData ? (
            <Button
              //className="cardButton"

              variant="contained"
              onClick={() => setOpenWLForm(true)}
              sx={{
                flexBasis: "60%",
                p: 0,
                fontSize: "0.8rem",
                bgcolor: theme.palette.secondary[500],
                color: "white",
              }}
            >
              &nbsp;{wlData.status}&nbsp;
            </Button>
          ) : (
            <IconButton
              sx={{
                p: 0,
                bgcolor: theme.palette.secondary[500],
                color: "white",
                marginLeft: "2rem",
              }}
              className="cardButton"
              onClick={() => setOpenWLForm(true)}
            >
              <AddCircleIcon fontSize="small" />
            </IconButton>
          )}
          <Modal
            open={openWLForm}
            onClose={() => setOpenWLForm(false)}
            aria-labelledby={"add" + title}
            aria-describedby="formWatchlist"
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              bgcolor={theme.palette.grey[800]}
              border="5px solid black"
              boxShadow={24}
              p="5px"
              sx={{ transform: "translate(-50%,-50%)" }}
            >
              {user ? (
                <Box width="70dvw" height="90dvh" component="div">
                  {/* <WatchlistForm
                    movieid={movieid}
                    type={"movie"}
                    //handleCloseWatchForm={handleCloseWatchForm}
                    title={title}
                  /> */}
                </Box>
              ) : (
                <FlexBoxCenter width="70dvw" height="50dvh" component="div">
                  <Link to="/login" state={{ from: location }}>
                    Please login in order to add movie to your list
                  </Link>
                </FlexBoxCenter>
              )}
            </Box>
          </Modal>
          {user && wlData && wlData.rating ? (
            <Box
              // border={}
              width="35px"
              zIndex="1"
              overflow="hidden"
              color={theme.palette.primary[700]}
              //className="movielist-userscore"
            >
              <Box
                display="block"
                position="relative"
                width="25px"
                textAlign="center"
                p="1px 0px"
                left="10px"
                component="span"
                fontSize="0.9rem"
                fontWeight="bold"
                bgcolor="white"
                sx={{
                  "&:before": {
                    content: "''",
                    position: "absolute",
                    width: "25px",
                    height: "100%",
                    left: "-5px",
                    zIndex: "-1",
                    transform: "rotate(-45deg)",
                    bgcolor: "white",
                  },
                }}
              >
                {wlData.rating}
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <FlexBox
          component="div"
          flexBasis="50%"
          justifyContent="space-between"
          //className="bottom-info"
        >
          <Box component="div">
            <PersonOutlineIcon
              sx={{ verticalAlign: "-4px" }}
              fontSize="small"
            />
            <span>{popularity ? numFormatter(popularity) : "N/A"}</span>
          </Box>
          <Box component="div" marginRight="1rem">
            <StarBorderPurple500OutlinedIcon
              sx={{ verticalAlign: "-4px", color: "orange" }}
              fontSize="small"
            />
            <em>{rating ? rating : "N/A"}</em>
          </Box>
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

export default MovieCard;
