import React from 'react';
import { Pagination } from 'react-bootstrap';

const CharactersPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Calculate range of visible page numbers
  const getVisiblePageNumbers = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.First
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      />

      {getVisiblePageNumbers().map((page, index) => {
        if (page === '...') {
          return <Pagination.Ellipsis key={`ellipsis-${index}`} />;
        }
        return (
          <Pagination.Item
            key={`page-${page}`}
            active={page - 1 === currentPage}
            onClick={() => onPageChange(page - 1)}
          >
            {page}
          </Pagination.Item>
        );
      })}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage >= totalPages - 1}
      />
    </Pagination>
  );
};

export default CharactersPagination; 