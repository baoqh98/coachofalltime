import React from 'react';

import classes from './ModalDialog.module.css';

const ModalDialog = (props) => {
  return <div className={classes['modal-dialog']}>{props.children}</div>;
};

export default ModalDialog;
