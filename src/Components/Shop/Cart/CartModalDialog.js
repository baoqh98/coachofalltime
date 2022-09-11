import React, { useContext, useState } from 'react';
import { CartContext } from '../../../store/cart-context';
import ButtonSecondary from '../../../UI/Button/ButtonSecondary';
import ButtonPrimary from '../../../UI/Button/ButtonPrimary';

import classes from './CartModalDialog.module.css';
import CartModalItem from './CartModalItem';
import { useNavigate } from 'react-router-dom';

const CartModalDialog = (props) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const cartCTX = useContext(CartContext);
  const { items, totalAmount, checkOutCart, resetCart } = cartCTX;

  const checkoutNavigateHandler = () => {
    if (items.length === 0) {
      setErrorMessage(true);
      return;
    }
    checkOutCart(totalAmount);
    resetCart();
    props.onCloseModal();
    navigate('/errorPage');
  };

  return (
    <div className={classes['cart-modal']}>
      <header>
        <div className={classes['header-action']}>
          <button className={classes.close} onClick={props.onCloseModal}>
            <i className='fa-solid fa-xmark' />
          </button>
        </div>
        <section className={classes['modal-title']}>
          <h1>My Cart ({cartCTX.totalQuantity})</h1>
          <span className={classes['total-amount']}>
            Total Amount: <span>${totalAmount}</span>
          </span>
        </section>
      </header>
      <main>
        <ul className={classes['cart-list']}>
          {items.map((item) => (
            <CartModalItem
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              itemTotalPrice={item.itemTotalPrice}
            />
          ))}
          {errorMessage && (
            <p
              style={{
                textAlign: 'center',
              }}
            >
              Could not checkout because your cart is empty!
            </p>
          )}
        </ul>
      </main>

      <footer>
        <div className={classes.checkout}>
          <ButtonPrimary onClick={checkoutNavigateHandler}>
            Proceed to Checkout
          </ButtonPrimary>
          <ButtonSecondary onClick={props.onCloseModal}>
            continue shopping
          </ButtonSecondary>
        </div>
      </footer>
    </div>
  );
};

export default CartModalDialog;
