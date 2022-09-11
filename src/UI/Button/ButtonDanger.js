import React from 'react';

import classes from './ButtonDanger.module.css';

const ButtonDanger = (props) => {
  return (
    <button
      className={
        props.icon
          ? classes['danger-btn'].concat(' ' + classes.icon)
          : classes['danger-btn']
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonDanger;
