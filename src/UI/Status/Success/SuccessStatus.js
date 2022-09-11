import React from 'react';

// UI
import ButtonSecondary from '../../Button/ButtonSecondary';

import classes from './SuccessStatus.module.css';

const SuccessStatus = (props) => {
  return (
    <div className={classes['success-wrapper']}>
      <div className={classes.success}>
        <h2 className={classes.title}>{props.title}</h2>
        <p className={classes.content}>{props.content}</p>
        <div className={classes.actions}>
          <ButtonSecondary onClick={props.onClose}>Exit</ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default SuccessStatus;
