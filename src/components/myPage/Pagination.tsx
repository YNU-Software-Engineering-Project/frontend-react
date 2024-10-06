import React from 'react';
import styles from 'styles/myPage/Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push(1, '...');
      }

      const start = Math.max(currentPage - 2, 1);
      const end = Math.min(currentPage + 2, totalPages);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <span className={styles.page_number}>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={currentPage === page ? styles.active : styles.deactive}
            disabled={typeof page !== 'number'}
          >
            {page === '...' ? <span className={styles.ellipsis}>...</span> : page}
          </button>
        ))}
      </span>

      <button
        className={styles.pagination_button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;