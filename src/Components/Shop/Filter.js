import React, { useState } from 'react';
import classes from './Filter.module.css';

const activeClass = {
  backgroundColor: '#6bd89e',
  color: '#fff',
};

const defaultTag = {
  id: 'default',
  type: 'all',
};

const Filter = ({ products, onFilter }) => {
  const [activeTag, setActiveTag] = useState(defaultTag);
  if (!products) return;

  const uniqProductTags = [...new Set(products.map((item) => item.type))].map(
    (type, i) => {
      return {
        id: `${i + 1}`,
        type,
      };
    }
  );

  const currentTagStyle = (id) => {
    if (id === activeTag.id) {
      return activeClass;
    } else {
      return null;
    }
  };

  const selectTagHandler = (event, type) => {
    setActiveTag({ id: event.currentTarget.id });
    onFilter(type);
  };

  const tagList = uniqProductTags.map((productTag) => {
    return (
      <li
        key={productTag.id}
        id={productTag.id}
        className={classes['tag-item']}
        style={currentTagStyle(productTag.id)}
        onClick={(event) => selectTagHandler(event, productTag.type)}
      >
        <span className={classes['tag-content']}>{productTag.type}</span>
      </li>
    );
  });

  return (
    <div className={classes['filter-box']}>
      <ul className={classes['tags-list']}>
        <li
          key={'all-product'}
          id={defaultTag.id}
          className={classes['tag-item']}
          style={currentTagStyle(
            activeTag.id === defaultTag.id ? activeTag.id : defaultTag.id
          )}
          onClick={(event) => selectTagHandler(event, defaultTag.type)}
        >
          <span className={classes['tag-content']}>All product</span>
        </li>
        {tagList}
      </ul>
    </div>
  );
};

export default Filter;
