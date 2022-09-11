import React from 'react';

import classes from './Responsive.module.css';

const Responsive = () => {
  return (
    <section className={classes.screen}>
      <img src='assets/Bean Eater-1s-164px.svg' alt='' />
      <h1 className={classes.head}>
        This app haven't supported on tablets and mobiles yet
      </h1>
      <p className={classes.description}>
        We recommend using the application on laptop or pc for the best
        experience
      </p>
    </section>
  );
};

export default Responsive;
