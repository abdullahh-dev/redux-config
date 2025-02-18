export type Pagination = {
  page: number;
  pageSize: number;
};

export const createUrlQuery = (
  url: string,
  filters?: any,
  pagination?: Pagination
) => {
  let queryParams = "?";

  for (const key in filters) {
    if (filters[key] && filters[key] !== "All") {
      const queryKey = key;
      if (queryKey) {
        if (Array.isArray(filters[key])) {
          queryParams += `${queryKey}=${filters[key].join(",")}&`;
        } else {
          queryParams += `${queryKey}=${filters[key]}&`;
        }
      }
    }
  }

  if (pagination) {
    // Add pagination parameters to the query
    queryParams += `page=${pagination.page + 1}&take=${pagination.pageSize}&`;
  }

  // Remove the trailing '&' if it exists
  if (queryParams.endsWith("&")) {
    queryParams = queryParams.slice(0, -1);
  }

  return `${url}${queryParams}`;
};

export const createUrlQueryWithId = (
  url: string,
  supplierId: number,
  filters?: any,
  pagination?: Pagination
) => {
  let queryParams = `?id=${supplierId}&`;

  for (const key in filters) {
    if (filters[key] && filters[key] !== "All") {
      const queryKey = key;
      if (queryKey) {
        if (Array.isArray(filters[key])) {
          queryParams += `${queryKey}=${filters[key].join(",")}&`;
        } else {
          queryParams += `${queryKey}=${filters[key]}&`;
        }
      }
    }
  }

  if (pagination) {
    // Add pagination parameters to the query
    queryParams += `page=${pagination.page + 1}&take=${pagination.pageSize}&`;
  }

  // Remove the trailing '&' if it exists
  if (queryParams.endsWith("&")) {
    queryParams = queryParams.slice(0, -1);
  }

  return `${url}${queryParams}`;
};
