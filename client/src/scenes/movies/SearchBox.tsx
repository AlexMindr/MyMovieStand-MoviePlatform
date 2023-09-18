import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FlexBoxCenter from "@/shared/FlexBoxCenter";
import FlexBox from "@/shared/FlexBox";
import { Dispatch, SetStateAction } from "react";

type Props = {
  inputSearch: string;
  setInputSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const SearchBox = ({ inputSearch, setInputSearch, setPage }: Props) => {
  const theme = useTheme();
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    setPage(1);
  };
  return (
    <FlexBox
      flexBasis={{ lg: "50%" }}
      justifyContent="center"
      maxWidth={"500px"}
      marginX={"auto"}
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
          onClick={() => {
            setInputSearch(() => "");
          }}
        >
          <ClearIcon />
        </IconButton>
      </FlexBoxCenter>
    </FlexBox>
  );
};

export default SearchBox;
