import React from 'react';
import styles from 'styles/adminPage/pageManage.module.css';

interface PageManageProps {
  totalUsers: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageManage: React.FC<PageManageProps> = ({ totalUsers, currentPage, setCurrentPage }) => {
  const usersPerPage = 10;

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
      
      const start = Math.max(currentPage - 2, 2);
      const end = Math.min(currentPage + 2, totalPages - 1);

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
        <button className={styles.pagination_button}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        <span className={styles.page_number}>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={currentPage === page ? styles.active : styles.deactive}
              disabled={typeof page !== 'number'}
            >
              {page === '...' ? <span className={styles.ellipsis}>...</span> : page}
            </button>
          ))}
        </span>

        <button className={styles.pagination_button}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
  );
};

export default PageManage;
