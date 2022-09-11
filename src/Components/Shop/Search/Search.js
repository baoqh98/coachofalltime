import React, { useRef } from 'react';

import classes from './Search.module.css';

const Search = ({ onSearch }) => {
  const inputRef = useRef();

  const searchHandler = (event) => {
    if (event.key !== 'Enter') return;
    const enteredInput = inputRef.current.value;
    onSearch(enteredInput);
  };

  return (
    <div className={classes['search-box']}>
      <input
        className={classes['search-input']}
        ref={inputRef}
        defaultValue=''
        onKeyDown={searchHandler}
        placeholder='Search product'
        type='text'
      />
      <div className={classes.action}>
        <button onClick={searchHandler} className={classes['search-action']}>
          <span>Search</span>
          <i className='fa-solid fa-magnifying-glass'></i>
        </button>
        {/* <button
          onClick={() => onSearch('')}
          className={classes['reset-action']}
        >
          <i className='fa-solid fa-rotate-left'></i>
        </button> */}
      </div>
    </div>
  );
};

export default Search;
