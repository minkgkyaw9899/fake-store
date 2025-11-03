export type PaginationResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export const getNextPageParam = (res: { data: PaginationResponse }) => {
  const currentPage = res.data.page;
  const totalPage = res.data.totalPages;
  const nextPage = currentPage < totalPage ? currentPage + 1 : undefined;

  return nextPage;
};
