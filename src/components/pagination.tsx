import { buttonStyles } from '../shared/styles/button';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex justify-center  items-center gap-x-8">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={buttonStyles.base}
      >
        ←
      </button>
      <span>
        Page <span>{currentPage}</span> /{totalPages}
      </span>
      <button
        type="button"
        className={buttonStyles.base}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
};
