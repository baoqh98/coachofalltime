import React from 'react';

import classes from './ButtonUpdateFile.module.css';

const ButtonUpdateFile = ({ refUpdate, isIcon = false, onUpdate, onRef }) => {
  return (
    <button
      ref={onRef}
      className={!isIcon ? `${classes.updateBtn}` : `${classes.saveButtonIcon}`}
      onClick={(event) => onUpdate(event, refUpdate)}
    >
      {isIcon ? <i className='fa-solid fa-pen-to-square' /> : 'Update'}
    </button>
  );
};

export default ButtonUpdateFile;
