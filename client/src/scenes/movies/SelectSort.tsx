import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
  selectSort: string;
  setPageParams: SetURLSearchParams;
};

const SelectSort = ({ selectSort, setPageParams }: Props) => {
  const handleChangeSort = (event: SelectChangeEvent) => {
    setPageParams(
      (prev) => {
        if (event.target.value === "") prev.delete("sort");
        if (event.target.value !== "")
          prev.set("sort", encodeURIComponent(event.target.value));
        prev.delete("page");
        prev.set("page", encodeURIComponent("1"));
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <Box component="div" minWidth="100px" m={1}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="select-sort-label">Sort</InputLabel>
        <Select
          labelId="select-sort-label"
          value={selectSort}
          id="select-sort"
          label="Sort"
          onChange={handleChangeSort}
          autoWidth
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"release_date"}>Date</MenuItem>
          <MenuItem value={"rating"}>Score</MenuItem>
          <MenuItem value={"popularity"}>Popularity</MenuItem>
          <MenuItem value={"duration"}>Duration</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectSort;
