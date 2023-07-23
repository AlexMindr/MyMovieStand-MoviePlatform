import numFormatter from "@/shared/functions/numberFormat";
//import WatchlistForm from "../watchlist/WatchlistForm";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

import Modal from "@mui/material/Modal";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";
import { useState } from "react";

type Props = {
  wlData: { rating: number; status: string };
  user: { username: string; fullname: string };
  popularity: number;
  rating: number;
  title: string;
};

const MovieCardBottom = ({
  wlData,
  user,
  popularity,
  rating,
  title,
}: Props) => {
  const theme = useTheme();

  const [openWLForm, setOpenWLForm] = useState(false);

  return (
    <FlexBox
      justifyContent="space-around"
      m="0.25rem 0.1rem"
      minHeight="25px"
      component="div"
    >
      <Box component="div" flexBasis="50%" display="flex" alignItems="center">
        {wlData ? (
          <Button
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
      <FlexBox component="div" flexBasis="50%" justifyContent="space-between">
        <Box component="div">
          <PersonOutlineIcon sx={{ verticalAlign: "-4px" }} fontSize="small" />
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
  );
};

export default MovieCardBottom;
