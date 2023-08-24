import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useState } from "react";
import TrailerModal from "../global/TrailerModal";

type Props = {
  trailer: string;
  overview: string;
  title: string;
};

const SynopsisTrailer = ({ overview, trailer, title }: Props) => {
  const [openTrailer, setOpenTrailer] = useState(false);
  const { palette } = useTheme();
  return (
    <>
      <Box
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        minHeight="250px"
        py="0.5rem"
      >
        <Box
          component="article"
          flexBasis={{ xs: "100%", md: "60%", lg: "50%" }}
          width="100%"
        >
          <Typography variant="h4" sx={{ py: "0.2rem" }}>
            Synopsis
          </Typography>
          <Divider flexItem />
          <Typography
            className="synopsis"
            component="p"
            sx={{
              maxHeight: "210px",
              textAlign: "justify",
              py: "0.5rem",
              px: "0.5rem",
              fontSize: {
                md: "clamp(0.7rem,0.7rem + 5px, 0.8rem)",
                lg: "clamp(0.85rem,0.85rem + 5px, 0.95rem)",
              },
              overflow: "hidden",
              "&:hover": { overflowy: "scroll" },
            }}
          >
            {overview ? overview : <em>No synopsis has been added</em>}
          </Typography>
        </Box>

        <Box
          position="relative"
          height="100%"
          flexBasis={{ xs: "100%", md: "40%", lg: "50%" }}
          width="100%"
          minHeight={{ xs: "250px", md: "auto" }}
          maxWidth={{ xs: "300px" }}
          mx="auto"
          sx={
            trailer != null
              ? {
                  backgroundSize: "100% auto",
                  backgroundPosition: "center center",
                  backgroundBlendMode: "screen",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${`https://i.ytimg.com/vi/${trailer}/mqdefault.jpg`})`,
                  opacity: 0.7,
                }
              : {
                  bgcolor: palette.grey[400],
                }
          }
        >
          <IconButton
            sx={{
              opacity: 1,
              color: "red",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => setOpenTrailer(true)}
            disabled={trailer ? false : true}
          >
            <PlayCircleOutlineIcon fontSize="large" />
          </IconButton>
          {trailer ? (
            <TrailerModal
              openTrailer={openTrailer}
              setOpenTrailer={setOpenTrailer}
              labelTitle={title}
              trailer={trailer}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Divider flexItem />
    </>
  );
};

export default SynopsisTrailer;
