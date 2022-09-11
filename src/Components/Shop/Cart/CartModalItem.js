import React, { useContext } from 'react';
import { CartContext } from '../../../store/cart-context';

import classes from './CartModalItem.module.css';

const CartModalItem = (props) => {
  const cartCTX = useContext(CartContext);

  const removeItem = () => {
    cartCTX.removeItem(props.id);
  };

  return (
    <li className={classes['cart-item']} key={props.id}>
      <div className={classes.img}>
        <img src={props.image} alt='name' />
      </div>
      <div className={classes.body}>
        <div className={classes['item-row']}>
          <span className={classes['id-product']}>code: #{props.id}</span>
        </div>
        <div className={classes['item-row']}>
          <span className={classes.name}>{props.title}</span>
          <span className={classes['total-price']}>
            ${props.itemTotalPrice}
          </span>
        </div>
        <div className={classes['item-row']}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.status}>status</span>
        </div>
        <div className={classes['item-row']}>
          <span className={classes.quantity}>x {props.quantity}</span>
          <button className={classes.delete} onClick={removeItem}>
            <i className='fa-solid fa-trash-can' />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartModalItem;
