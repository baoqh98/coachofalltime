import React from 'react';

import classes from './RecapTextEditor.module.css';

const RecapTextEditor = ({ textarea }) => {
  return (
    <div className={classes['detail-recap']}>
      <article className={classes.article}>{textarea}</article>
    </div>
  );
};

export default RecapTextEditor;
