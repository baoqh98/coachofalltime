import React from 'react';
import ButtonPrimary from '../../UI/Button/ButtonPrimary';

import classes from './FormStatus.module.css';

const FormStatus = (props) => {
  return (
    <div className={classes.status}>
      <span className={classes.message}>{props.children}</span>
      <ButtonPrimary onClick={props.onResetUpload}>Ok</ButtonPrimary>
    </div>
  );
};

export default FormStatus;
