import React from 'react';

import classes from './Upload.module.css';

const Upload = (props) => {
  return (
    <section className={classes['upload-section']}>
      <div className={classes.title}>
        <h2>Upload files</h2>
      </div>

      <section className={classes.upload}>
        <div className={classes['upload-box']} onClick={props.onShowModal}>
          <div className={classes.guide}>
            <span className={classes.icon}>
              <i className='fa-solid fa-file-arrow-up'></i>
            </span>
            <p>Drag and drop files, or Browse</p>
            <span className={classes.sup}>Support url of youtube</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Upload;
