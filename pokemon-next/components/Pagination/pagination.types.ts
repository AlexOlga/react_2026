export type PropsPagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
