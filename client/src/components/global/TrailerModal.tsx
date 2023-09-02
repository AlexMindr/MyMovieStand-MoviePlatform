import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";

type Props = {
  openTrailer: boolean;
  setOpenTrailer: Dispatch<SetStateAction<boolean>>;
  labelTitle: string;
  trailer: string;
};

const TrailerModal = ({
  openTrailer,
  setOpenTrailer,
  labelTitle,
  trailer,
}: Props) => {
  const { palette } = useTheme();
  return (
    <Modal
      open={openTrailer}
      onClose={() => setOpenTrailer(false)}
      aria-labelledby={labelTitle}
      aria-describedby="trailer"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        bgcolor={palette.grey[800]}
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
          sx={{
            frameborder: "0",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          }}
        />
      </Box>
    </Modal>
  );
};

export default TrailerModal;
