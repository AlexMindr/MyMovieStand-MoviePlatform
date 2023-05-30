import { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

type ScrollbtnProps = {
  showBelow?: number;
};

const Scrollbtn = ({ showBelow = 300 }: ScrollbtnProps) => {
  const [showScroll, setShowScroll] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > showBelow) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= showBelow) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ArrowCircleUpIcon
      fontSize="large"
      onClick={scrollTop}
      sx={{
        display: showScroll ? "block" : "none",
        position: "fixed",
        width: "10%",
        bottom: "20px",
        alignItems: "center",
        height: "35px",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
        transition: "opacity 0.4s",
        opacity: 0.3,
        color: "red",
        right: "1%",
        "&:hover": { opacity: 1 },
      }}
    />
  );
};

export default Scrollbtn;
