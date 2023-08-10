import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectSort: string;
  setSelectSort: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const SelectSort = ({ selectSort, setSelectSort, setPage }: Props) => {
  const handleChangeSort = (event: SelectChangeEvent) => {
    setSelectSort(event.target.value);
    setPage(1);
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
