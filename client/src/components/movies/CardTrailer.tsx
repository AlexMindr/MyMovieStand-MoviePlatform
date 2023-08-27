import { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import TrailerModal from "@/components/global/TrailerModal";

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
        <TrailerModal
          openTrailer={openTrailer}
          setOpenTrailer={setOpenTrailer}
          labelTitle={title}
          trailer={trailer}
        />
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
