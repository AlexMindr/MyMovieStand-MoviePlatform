import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectOrder: string;
  setSelectOrder: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const SelectOrder = ({ selectOrder, setSelectOrder, setPage }: Props) => {
  const handleChangeOrder = (event: SelectChangeEvent) => {
    setSelectOrder(event.target.value);
    setPage(1);
  };

  return (
    <Box component="div" minWidth="100px" m={1}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="select-order-label">Order</InputLabel>
        <Select
          labelId="select-order-label"
          id="select-order"
          value={selectOrder}
          label="Order"
          onChange={handleChangeOrder}
        >
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DESC"}>Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectOrder;
