import React, { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const maxPageNumbers = 5; // Number of page numbers to display
    const maxEndNumbers = 2; // Number of last page numbers to display

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageNumbers) {
      startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
      endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
    }

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = endPage - maxPageNumbers + 1;
    }

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );

    return [
      ...pageNumbers.slice(0, maxPageNumbers - maxEndNumbers),
      ...pageNumbers.slice(-maxEndNumbers),
    ];
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
      setActivePage(pageNumber);
    }
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(pageNumber)}
          className={`paginate-button ${
            activePage === pageNumber ? "active" : ""
          }`}
        >
          {pageNumber}
        </button>
      ))}
      {totalPages > 10 && activePage + 9 < totalPages && (
        <>
          <span>...</span>
          <button onClick={() => handlePageClick(activePage + 10)}>
            {activePage + 10}
          </button>
          <button onClick={() => handlePageClick(activePage + 11)}>
            {activePage + 11}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
