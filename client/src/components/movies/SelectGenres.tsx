import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { GenreType } from "@/shared/types";
import { getGenres } from "@/api";
import Loading from "@/components/global/Loading";
import GeneralError from "@/components/error/GeneralError";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  selectGenres: string[];
  setSelectGenres: Dispatch<SetStateAction<string[]>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
    },
  },
};

function isArrayContained(subArray: string[], mainArray: string[]): boolean {
  return subArray.every((item) => mainArray.includes(item));
}

const SelectGenres = ({ selectGenres, setSelectGenres, setPage }: Props) => {
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await getGenres();
      return data as GenreType[];
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isFetching && !isLoading && !isError) {
      isArrayContained(
        selectGenres,
        data.map(({ name }) => name)
      )
        ? setSelectGenres(selectGenres)
        : setSelectGenres([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectGenres]);

  const handleChangeGenres = (
    event: SelectChangeEvent<typeof selectGenres>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setPage(1);
  };
  if (isFetching || isLoading) return <Loading />;
  if (isError) return <GeneralError />;
  else
    return (
      <Box
        component="div"
        minWidth={{ xs: "100px", md: "150px", lg: "200px" }}
        m={1}
      >
        <FormControl
          variant="standard"
          sx={{ width: { xs: "100px", md: "150px", lg: "200px" } }}
        >
          <InputLabel id="select-genres-multiple-checkbox-label">
            Genres
          </InputLabel>
          <Select
            labelId="select-genres-multiple-checkbox-label"
            id="select-genres-multiple-checkbox"
            multiple
            value={selectGenres}
            onChange={handleChangeGenres}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {data.map(({ name }) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectGenres.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
};

export default SelectGenres;
