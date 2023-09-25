export function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

export function getPagingData(data, page, limit) {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { rows, totalPages, currentPage };
}

export function getPagingDataGroup(data, page, limit) {
  const { rows } = data;
  const totalItems = data.count.length;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { rows, totalPages, currentPage };
}
