import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
const FlexBox = styled(Box)<BoxProps>(() => ({
  display: "flex",
  alignItems: "center",
}));

export default FlexBox;
