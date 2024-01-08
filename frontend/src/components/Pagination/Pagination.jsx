import React from "react";
import { useState } from "react";

import styles from "./Pagination.module.css";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  //   const handlePageClick = (pageNumber) => {
  //     setActivePage(pageNumber);
  //   };

  return (
    <div>
      <nav>
        <ul className={styles.paginationNumbers}>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`page-link ${
                  pageNumber === activePage ? "active" : ""
                }`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
