import React, { useContext, useRef, useState } from 'react';

import { Col } from 'react-grid-system';
import { CartContext } from '../../../store/cart-context';
import ButtonPrimary from '../../../UI/Button/ButtonPrimary';

import { colors } from '../../../UI/Colors/colors';
import classes from './ProductItem.module.css';

const ProductItem = ({ id, title, price, image, type, desc }) => {
  const counter = useRef(null);
  const [isFavour, setIsFavour] = useState(false);
  const [countState, setCountState] = useState(0);
  const cartCtx = useContext(CartContext);

  const increaseCountHandler = () => {
    setCountState((prevCount) => prevCount + 1);
  };

  const decreaseCountHandler = () => {
    if (countState === 0) {
      return;
    }
    setCountState((prevCount) => prevCount - 1);
  };

  const addItemToCart = () => {
    const enteredQuantityItem = +counter.current.innerText;
    if (enteredQuantityItem === 0) return;
    cartCtx.addItem({
      id: id,
      title: title,
      price: price,
      image: image,
      quantity: enteredQuantityItem,
      itemTotalPrice: enteredQuantityItem * price,
    });
    setCountState(0);
  };

  return (
    <Col sm={3} id={id} key={id}>
      <div className={classes['product-item']}>
        <div className={classes['product-card']}>
          <div className={classes.image}>
            <img src={image} alt={title} />
            <span onClick={() => setIsFavour((prev) => !prev)}>
              <i
                className='fa-solid fa-heart'
                style={{ color: isFavour ? colors().danger : '#fff' }}
              ></i>
            </span>
          </div>
          <div className={classes.content}>
            <div className={classes.title}>
              <h3>{title}</h3>
            </div>
            <div className={classes.body}>
              <div className={classes.type}>
                <p>{type}</p>
              </div>
              <div className={classes.price}>
                <span>${price}</span>
              </div>
            </div>

            <div className={classes.description}>
              <p>{desc}</p>
            </div>
          </div>
          <div className={classes.actions}>
            <ButtonPrimary onClick={addItemToCart}>Add to Cart</ButtonPrimary>
            <div className={classes.form}>
              <button className={classes.minus} onClick={decreaseCountHandler}>
                -
              </button>
              <span ref={counter} className={classes.count}>
                {countState}
              </span>
              <button className={classes.add} onClick={increaseCountHandler}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductItem;
