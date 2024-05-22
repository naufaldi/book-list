import React from 'react';
import Button from './common/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pagination">
      <Button
        className="button--primary"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        className="button--primary"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
