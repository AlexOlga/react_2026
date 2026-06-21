'use client';
import { useRouter} from '@/i18n/navigation';
import { buttonStyles } from '../../shared/styles/button';
import type { PropsPagination } from './pagination.types';
import { useSearchParams } from 'next/navigation';

const Pagination = ({ currentPage, totalPages }: PropsPagination) => {
  const router = useRouter(); 
  const searchParams = useSearchParams();

const onPageChange = (page: number) => { 
  const params = new URLSearchParams(searchParams.toString()); 
  params.set('page', String(page)); 
  router.push(`?${params.toString()}`); 
};
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
export default Pagination;
