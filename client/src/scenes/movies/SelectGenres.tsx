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
import Loading from "@/components/global/Loading";
import { useLayoutEffect, useMemo } from "react";
import { apiGetGenres } from "@/api/movieApi";
import { SetURLSearchParams } from "react-router-dom";

type Props = {
  selectGenres: string[];
  setPageParams: SetURLSearchParams;
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

const SelectGenres = ({ selectGenres, setPageParams }: Props) => {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { genres } = await apiGetGenres();
      return genres as GenreType[];
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (!isFetching && !isLoading && !isError) {
      verifyGenreValidityAndUpdate(setPageParams, selectGenres, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectGenres, data]);

  const genresSelectMenu = useMemo(() => {
    return data?.map(({ name }) => (
      <MenuItem key={name} value={name}>
        <Checkbox checked={selectGenres.indexOf(name) > -1} />
        <ListItemText primary={name} />
      </MenuItem>
    ));
  }, [data, selectGenres]);

  const handleChangeGenres = (
    event: SelectChangeEvent<typeof selectGenres>
  ) => {
    const {
      target: { value },
    } = event;
    if (!isFetching && !isLoading && !isError) {
      verifyGenreValidityAndUpdate(setPageParams, value, data);
    }
  };
  if (isError) return <></>;
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
            {isFetching || isLoading ? (
              <Loading minHeight="10svh" />
            ) : (
              genresSelectMenu
            )}
          </Select>
        </FormControl>
      </Box>
    );
};

export default SelectGenres;

function isValidGenre(
  subArray: string[] | string,
  mainArray: string[]
): boolean {
  if (typeof subArray === "string") return mainArray.includes(subArray);
  return subArray.every((item) => mainArray.includes(item));
}

function verifyGenreValidityAndUpdate(
  setPageParams: SetURLSearchParams,
  selectGenres: string[] | string,
  data: GenreType[]
) {
  const valueArray =
    typeof selectGenres === "string" ? [selectGenres] : selectGenres;
  isValidGenre(
    valueArray,
    data.map(({ name }) => name)
  )
    ? setPageParams(
        (prev) => {
          if (valueArray.length === 0) {
            prev.delete("genres");
          } else if (valueArray.length === 1) {
            prev.set("genres", encodeURIComponent(valueArray.toString()));
          } else if (valueArray.length > 1) {
            prev.set("genres", encodeURIComponent(valueArray.join(",")));
          }
          prev.delete("page");
          prev.set("page", encodeURIComponent("1"));
          return prev;
        },
        { replace: true }
      )
    : setPageParams(
        (prev) => {
          prev.delete("genres");
          prev.delete("page");
          prev.set("page", encodeURIComponent("1"));
          return prev;
        },
        { replace: true }
      );
}
