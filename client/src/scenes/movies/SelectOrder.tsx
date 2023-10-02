import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
  selectOrder: string;
  setPageParams: SetURLSearchParams;
};

const SelectOrder = ({ selectOrder, setPageParams }: Props) => {
  const handleChangeOrder = (event: SelectChangeEvent) => {
    setPageParams(
      (prev) => {
        if (event.target.value === "") prev.delete("order");
        if (event.target.value !== "")
          prev.set("order", encodeURIComponent(event.target.value));
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
