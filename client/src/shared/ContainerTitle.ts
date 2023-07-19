import Typography, {
  TypographyPropsVariantOverrides,
} from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const ContainerTitle = styled(Typography)<TypographyPropsVariantOverrides>(
  ({ theme }) => ({
    paddingLeft: "20px",
    paddingTop: "0.75rem",
    paddingBottom: "0.5rem",
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: `${theme.palette.primary[100]}`,
    component: "h2",
  })
);

export default ContainerTitle;
