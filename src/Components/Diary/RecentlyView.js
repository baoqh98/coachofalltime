import React from 'react';

import classes from './RecentlyView.module.css';
import RecentlyViewList from './RecentlyViewList';

const RecentlyView = () => {
  return (
    <section className={classes['recently-view']}>
      <div className={classes.titles}>
        <h2 className={classes['view-title']}>Recently access</h2>
        <button className={classes['see-more']}>
          <span>See more</span>
        </button>
      </div>

      <RecentlyViewList />
    </section>
  );
};

export default RecentlyView;
