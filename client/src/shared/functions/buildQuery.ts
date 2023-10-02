const sortValues = {
  release_date: "Date",
  popularity: "Popularity",
  duration: "Duration",
  rating: "Score",
} as const;

type SortQueryType = keyof typeof sortValues;

const orderValues = {
  ASC: "Ascending",
  DESC: "Descending",
};

type OrderQueryType = keyof typeof orderValues;

export function getParamsObject(pageParams: URLSearchParams) {
  //check if page is number > 0
  const pageNumber = pageParams?.get("page");
  const page =
    pageNumber && parseInt(pageNumber) > 0 ? parseInt(pageNumber) : 1;
  const keywords = pageParams?.get("keywords") ? true : false;
  //check if other params exist, if not we assign empty string
  const search = decodeURIComponent(pageParams?.get("search") ?? "");
  const sort =
    (sortValues[pageParams?.get("sort") as SortQueryType] !== undefined
      ? pageParams?.get("sort")
      : "") ?? "";
  const order =
    (orderValues[pageParams?.get("order") as OrderQueryType] !== undefined
      ? pageParams?.get("order")
      : "") ?? "";
  //check and parse genres into array
  const genresInit = pageParams?.get("genres");
  const genres =
    genresInit && genresInit != ""
      ? decodeURIComponent(genresInit).split(",")
      : [];
  return { page, search, sort, order, genres, keywords };
}

// export default function buildQuery(
//   inputSearch: string,
//   selectSort: string,
//   selectOrder: string,
//   selectGenres: string[],
//   page: number
// ): QueryFilterType {
//   const query: QueryFilterType = {};
//   if (inputSearch !== "") {
//     query.title = encodeURIComponent(inputSearch);
//   }
//   if (selectSort && selectSort !== "") {
//     query.sort = selectSort;
//   }
//   if (selectOrder && selectOrder !== "") {
//     query.order = selectOrder;
//   }
//   if (selectGenres && selectGenres?.length > 1) {
//     query.genres = encodeURIComponent(selectGenres.join(","));
//   } else if (selectGenres?.length === 1) {
//     query.genres = encodeURIComponent(selectGenres.toString());
//   }
//   query.page = page.toString();
//   return query;
// }
