import React, { useEffect, useState } from 'react';

import classes from './Pagination.module.css';

const Pagination = ({ totalPages, setPage, page }) => {
  const [defaultPage, setDefaultPage] = useState();

  const scrollToTop = (currentPage) => {
    if (currentPage === defaultPage) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPageHandler = () => {
    const setPageNumberCallBack = (prevPage) => {
      if (prevPage === totalPages - 1) return prevPage;
      return prevPage + 1;
    };
    setDefaultPage(setPageNumberCallBack);
    setPage(setPageNumberCallBack);
    const currentPage = setPageNumberCallBack(defaultPage);
    scrollToTop(currentPage);
  };

  const backPageHandler = () => {
    const setPageNumberCallBack = (prevPage) => {
      if (prevPage === 0) return prevPage;
      return prevPage - 1;
    };
    setDefaultPage(setPageNumberCallBack);
    setPage(setPageNumberCallBack);
    const currentPage = setPageNumberCallBack(defaultPage);
    scrollToTop(currentPage);
  };

  const selectPageHandler = (event) => {
    const currentPageNumber = +event.currentTarget.value;
    setDefaultPage(currentPageNumber - 1);
    setPage(currentPageNumber - 1);
    scrollToTop(currentPageNumber - 1);
  };

  const currentPageStyle = (index) => {
    if (index === defaultPage + 1)
      return `
    ${classes['pagination-item']} ${classes['current-page']}
    `;
  };

  let pageNavigationList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNavigationList.push(
      <li key={i} className={currentPageStyle(i)}>
        <button value={i} onClick={selectPageHandler}>
          {i}
        </button>
      </li>
    );
  }

  useEffect(() => {
    setDefaultPage(page);
  }, [page]);

  return (
    <div className={classes.pagination}>
      <ul className={classes['pagination-list']}>
        <button className={classes.back} onClick={backPageHandler}>
          <i className='fa-solid fa-angle-left' />
        </button>
        {!totalPages ? (
          <li className={classes['pagination-item']}>...</li>
        ) : (
          pageNavigationList
        )}
        <button className={classes.next} onClick={nextPageHandler}>
          <i className='fa-solid fa-angle-right' />
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
