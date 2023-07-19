import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
const FlexBoxCenter = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default FlexBoxCenter;
