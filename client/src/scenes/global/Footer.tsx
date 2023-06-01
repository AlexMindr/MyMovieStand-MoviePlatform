import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const Footer = () => {
  const { palette } = useTheme();
  return (
    <Box
      component="footer"
      bottom={0}
      width="100%"
      bgcolor={palette.primary[900]}
      marginTop="auto"
      position="relative"
      color={palette.primary.contrastText}
      borderTop={`3px solid ${palette.primary.main}`}
    >
      <Box
        fontStyle="italic"
        fontSize="0.75rem"
        p={1.5}
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        textAlign="left"
      >
        <span>© Alexandru-Cristian Mindroiu - All rights reserved. </span>
        <span> Contact: alexandru.mindroiu@email.com </span>
        <Divider
          sx={{
            height: "5px",
            marginTop: "5px",
            marginBottom: "5px",
            backgroundImage: `linear-gradient(to right,${palette.secondary.main},${palette.primary.main})`,
          }}
        />
        <span>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </span>
        <span>Credits to TMDB for all movie data.</span>
      </Box>
    </Box>
  );
};

export default Footer;
