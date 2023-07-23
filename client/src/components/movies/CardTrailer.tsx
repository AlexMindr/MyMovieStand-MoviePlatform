import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

type Props = {
  trailer: string;
  title: string;
};

const trailerButtonStyle = {
  fontSize: "0.8rem",
  borderRadius: "0.5rem",
  minWidth: "2rem",
  p: "1px 0.75rem",
  fontWeight: "600",
};

const MovieCardTrailer = ({ trailer, title }: Props) => {
  const theme = useTheme();

  const [openTrailer, setOpenTrailer] = useState(false);
  if (trailer)
    return (
      <>
        <Button
          onClick={() => setOpenTrailer(true)}
          sx={{
            ...trailerButtonStyle,
            bgcolor: theme.palette.primary[600],
            color: theme.palette.primary.contrastText,
          }}
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
          >
            <Box
              width="80dvw"
              height="80dvh"
              component="iframe"
              src={`https://www.youtube-nocookie.com/embed/${trailer}?autoplay=1&mute=1`}
              referrerPolicy="no-referrer"
            />
          </Box>
        </Modal>
      </>
    );
  return (
    <Button
      sx={{
        ...trailerButtonStyle,
        bgcolor: theme.palette.grey[200],
        "&:disabled": {
          color: theme.palette.grey[400],
        },
      }}
      variant="contained"
      disabled
    >
      PV
    </Button>
  );
};

export default MovieCardTrailer;
