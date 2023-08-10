import { QueryFilterType } from "@/shared/types";

export function getParamsObject(pageParams: URLSearchParams) {
  //check if page is number > 0
  const pageNumber = pageParams?.get("page");
  const page =
    pageNumber && parseInt(pageNumber) > 0 ? parseInt(pageNumber) : 1;
  //check if other params exist, if not we assign empty string
  const title = decodeURIComponent(pageParams?.get("title") ?? "");
  const sort = pageParams?.get("sort") ?? "";
  const order = pageParams?.get("order") ?? "";
  //check and parse genres into array
  const genresInit = pageParams?.get("genres");
  const genres =
    genresInit && genresInit != ""
      ? decodeURIComponent(genresInit).split(",")
      : [];
  return { page, title, sort, order, genres };
}

export default function buildQuery(
  inputSearch: string,
  selectSort: string,
  selectOrder: string,
  selectGenres: string[],
  page: number
): QueryFilterType {
  const query: QueryFilterType = {};
  if (inputSearch !== "") {
    query.title = encodeURIComponent(inputSearch);
  }
  if (selectSort && selectSort !== "") {
    query.sort = selectSort;
  }
  if (selectOrder && selectOrder !== "") {
    query.order = selectOrder;
  }
  if (selectGenres && selectGenres?.length > 1) {
    query.genres = encodeURIComponent(selectGenres.join(","));
  }
  query.page = page.toString();
  return query;
}
