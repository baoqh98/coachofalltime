import React, { useContext, useEffect, useReducer } from 'react';
import { CartContext } from '../../../store/cart-context';

import classes from './Cart.module.css';

const defaultBadgeState = {
  highlightBadge: false,
  badgeClass: '',
};

const badgeReducer = (state, action) => {
  if (action.totalQuantity) {
    return {
      ...state,
      highlightBadge: true,
      badgeClass: `${classes.badge} ${classes.bump}`,
    };
  }

  if (action.type === 'CLEAR_EFFECT') {
    return {
      ...state,
      badgeClass: `${classes.badge}`,
    };
  }

  return {
    ...defaultBadgeState,
  };
};

const Cart = (props) => {
  const [badgeState, dispatchBadgeState] = useReducer(
    badgeReducer,
    defaultBadgeState
  );
  const cartCTX = useContext(CartContext);

  const { totalQuantity } = cartCTX;

  useEffect(() => {
    dispatchBadgeState({ totalQuantity: totalQuantity });

    const timer = setTimeout(() => {
      dispatchBadgeState({ type: 'CLEAR_EFFECT' });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);

  return (
    <div className={classes['cart-box']}>
      <div className={classes.cart} onClick={props.onShowModal}>
        <span>My Cart</span>
        <i className='fa-solid fa-cart-shopping'></i>
        {badgeState.highlightBadge && (
          <span className={badgeState.badgeClass}>{totalQuantity}</span>
        )}
      </div>
    </div>
  );
};

export default Cart;
