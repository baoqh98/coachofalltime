import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Container } from 'react-grid-system';

import classes from './ViewImages.module.css';

const ViewImages = ({ src, images, onShowView }) => {
  const [mainImage, setMainImage] = useState(src);
  const [isShowRightBtn, setIsShowRightBtn] = useState(true);
  const [isShowLeftBtn, setIsShowLeftBtn] = useState(false);

  const showViewHandler = (event) => {
    if (!event.currentTarget) return;
    onShowView();
  };

  const selectImageHandler = useCallback(
    (index) => {
      if (index === images.length - 1) {
        setIsShowRightBtn(false);
        setIsShowLeftBtn(true);
      }
      if (index === 0) {
        setIsShowLeftBtn(false);
      }
      if (index > 0 && index < images.length - 1) {
        setIsShowLeftBtn(true);
        setIsShowRightBtn(true);
      }
      setMainImage(images[index]);
    },
    [images]
  );

  const nextImageHandler = () => {
    const index = images.findIndex((item) => item === mainImage);
    if (index !== -1) {
      setIsShowLeftBtn(true);
    }
    if (index === images.length - 2) {
      setIsShowRightBtn(false);
    }
    setMainImage(images[index + 1]);
  };

  const prevImageHandler = () => {
    const index = images.findIndex((item) => item === mainImage);
    if (index === 1) {
      setIsShowLeftBtn(false);
      setIsShowRightBtn(true);
    }
    setMainImage(images[index - 1]);
  };

  useEffect(() => {
    const index = images.findIndex((item) => item === src);
    selectImageHandler(index);
  }, [src, images, selectImageHandler]);

  const imageList = useMemo(() => {
    return (
      <div className={classes.list}>
        {images?.map((item, index) => {
          return (
            <div
              key={Math.random()}
              index={index}
              className={classes['image-item']}
              onClick={() => selectImageHandler(index)}
            >
              <img src={item} alt={item} />
            </div>
          );
        })}
      </div>
    );
  }, [images, selectImageHandler]);

  return (
    <>
      <section id='overlayView' className={classes.overlay}>
        <div className={classes.slide}>
          {isShowLeftBtn && (
            <button className={classes.leftBtn} onClick={prevImageHandler}>
              <i className='fa-solid fa-chevron-left'></i>
            </button>
          )}

          {isShowRightBtn && (
            <button className={classes.rightBtn} onClick={nextImageHandler}>
              <i className='fa-solid fa-chevron-right'></i>
            </button>
          )}
        </div>
      </section>

      <Container className={classes.container}>
        <button onClick={showViewHandler} className={classes['escape-btn']}>
          <i className='fa-solid fa-xmark'></i>
        </button>
        <div className={classes.wrapper}>
          <div className={classes['images-wrapper']}>
            <img src={mainImage} alt='' />
          </div>
          {imageList}
        </div>
      </Container>
    </>
  );
};

export default ViewImages;
