import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import { useState, MouseEvent } from "react";

type Props = { keywords: string };

const Keywords = ({ keywords }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { palette } = useTheme();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  return (
    <Box
      maxWidth={"100%"}
      component="ul"
      overflow={"hidden"}
      display={"grid"}
      gridTemplateColumns={"repeat(auto-fill,minmax(95px,1fr))"}
      mx="10px"
      columnGap={"8px"}
      rowGap={"8px"}
      sx={{
        placeItems: "center",
        listStyleType: "none",
        marginBlockStart: "0",
        marginBlockEnd: "0",
        paddingInlineStart: "0",
        "&>li": {
          maxWidth: { xs: "100px", md: "98px", lg: "100px" },
          fontSize: "0.85rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        "&>button": {
          gridColumn: {
            xs: "span 3",
            md: "span 2",
            lg: "span 3",
            xl: "span 4",
          },
        },
      }}
    >
      {keywords
        .split(",")
        .slice(0, 12)
        .map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}

      <Button
        sx={{ marginInline: "auto" }}
        variant="text"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        Show more
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={"top"}>
        <Box
          bgcolor={palette.primary[100]}
          maxWidth={"75svw"}
          minHeight={"200px"}
          component="ul"
          overflow={"hidden"}
          display={"grid"}
          gridTemplateColumns={"repeat(auto-fit,minmax(100px,1fr))"}
          mx="10px"
          columnGap={"8px"}
          rowGap={"8px"}
          sx={{
            placeItems: "center",
            listStyleType: "none",
            marginBlockStart: "0",
            marginBlockEnd: "0",
            paddingInlineStart: "0",
            "&>li": {
              maxWidth: "150px",
              fontSize: "0.8rem",
              // whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        >
          {keywords.split(",").map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </Box>
      </Popper>
    </Box>
  );
};

export default Keywords;
