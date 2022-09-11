import React from 'react';

import { Row, Col } from 'react-grid-system';

import classes from './RecentlyViewList.module.css';

const RecentlyViewItem = () => {
  return (
    <section className={classes['view-list']}>
      <Row>
        <Col sm={4}>
          <div className={classes['view-card']}>
            <div className={classes['view-card__wrapper']}></div>
            <div className={classes.thumbnail}>
              <img
                src='https://img.lovepik.com/photo/20211208/medium/lovepik-vertical-shot-vertical-screen-guilin-scenery-picture_501582051.jpg'
                alt=''
              />
            </div>
            <div className={classes['card-title']}>
              <p>diary.docx</p>
              <span>edited 8m ago</span>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          <div className={classes['view-card']}>
            <div className={classes['view-card__wrapper']}></div>
            <div className={classes.thumbnail}>
              <img
                src='https://i.ytimg.com/vi/0R2pXjCzTHk/maxresdefault.jpg'
                alt=''
              />
            </div>
            <div className={classes['card-title']}>
              <p>diary.docx</p>
              <span>edited 8m ago</span>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          <div className={classes['view-card']}>
            <div className={classes['view-card__wrapper']}></div>
            <div className={classes.thumbnail}>
              <img
                src='https://i.ytimg.com/vi/0R2pXjCzTHk/maxresdefault.jpg'
                alt=''
              />
            </div>
            <div className={classes['card-title']}>
              <p>diary.docx</p>
              <span>edited 8m ago</span>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default RecentlyViewItem;
