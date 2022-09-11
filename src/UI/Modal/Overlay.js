import React from 'react';

import classes from './Overlay.module.css';

const Overlay = (props) => {
  const overlayHandler = (event) => {
    if (event.target.id !== 'overlay') return;
    props.onClick();
  };

  return (
    <div id='overlay' onClick={overlayHandler} className={classes.overlay}>
      {props.children}
    </div>
  );
};

export default Overlay;
