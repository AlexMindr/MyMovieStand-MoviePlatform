import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
  inputSearch: string;
  keywords: boolean;
  setPageParams: SetURLSearchParams;
};

const SearchBox = ({ inputSearch, keywords, setPageParams }: Props) => {
  const theme = useTheme();
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageParams(
      (prev) => {
        if (event.target.value === "") prev.delete("search");
        if (event.target.value !== "")
          prev.set("search", encodeURIComponent(event.target.value));
        prev.delete("page");
        prev.set("page", encodeURIComponent("1"));
        return prev;
      },
      { replace: true }
    );
  };
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageParams(
      (prev) => {
        if (event.target.checked === false) prev.delete("keywords");
        if (event.target.checked === true)
          prev.set("keywords", encodeURIComponent(event.target.checked));
        prev.delete("page");
        prev.set("page", encodeURIComponent("1"));
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <FlexBox
      flexBasis={{ lg: "50%" }}
      justifyContent="center"
      maxWidth={"500px"}
      marginX={"auto"}
      mt="2rem"
      flexDirection={"column"}
    >
      <FlexBoxCenter
        width="100%"
        borderRadius="10px"
        border={`2px solid ${theme.palette.primary[700]}`}
        sx={{
          "& input": {
            width: "80%",
            height: "100%",
            border: "none",
            fontSize: "1rem",
            outline: "none",
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          sx={{
            position: "static",
            cursor: "pointer",
            color: theme.palette.grey[500],
            bgcolor: "white",
          }}
          aria-label="close-search"
        >
          <SearchIcon fontSize="medium" />
        </IconButton>
        <input
          id="browse-movies-search"
          type="text"
          aria-label="search"
          placeholder="Search movie..."
          value={inputSearch}
          onChange={handleChangeInput}
          autoComplete="off"
          spellCheck="false"
        />
        <IconButton
          sx={{
            cursor: "pointer",
            color: theme.palette.grey[200],
          }}
          onClick={() =>
            setPageParams(
              (prev) => {
                prev.delete("search");
                prev.delete("page");
                prev.set("page", encodeURIComponent("1"));
                return prev;
              },
              { replace: true }
            )
          }
        >
          <ClearIcon />
        </IconButton>
      </FlexBoxCenter>
      <FlexBox justifyContent="left" width="100%" ml="1rem">
        <FormControlLabel
          control={
            <Checkbox
              checked={keywords}
              onChange={handleChangeCheckbox}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          sx={{ ".MuiFormControlLabel-label": { fontSize: "0.85rem" } }}
          label="Include Keywords"
        />
      </FlexBox>
    </FlexBox>
  );
};

export default SearchBox;
