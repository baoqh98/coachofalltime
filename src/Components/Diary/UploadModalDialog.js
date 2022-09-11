import React from 'react';

import DiaryForm from './DiaryForm';

import classes from './UploadModalDialog.module.css';

const UploadModalDialog = (props) => {
  return (
    <section className={classes['upload-dialog']}>
      <header>
        <div className={classes.titles}></div>
      </header>

      <main>
        <DiaryForm onCloseModal={props.onCloseModal} />
      </main>
    </section>
  );
};

export default UploadModalDialog;
