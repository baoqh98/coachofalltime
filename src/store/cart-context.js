import React, { useReducer } from 'react';
import { useContext } from 'react';
import { useHttps } from '../helper/hooks/https/useHttps';
import { AuthContext } from './auth-context';
import { URL } from './URL';

const defaultCartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const CartContext = React.createContext({
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  checkOutCart: (url) => {},
  resetCart: () => {},
});

const cartReducer = (cartState, action) => {
  if (action.type === 'ADD') {
    const updatedTotalQuantity = cartState.totalQuantity + action.item.quantity;
    const updatedTotalAmount =
      cartState.totalAmount + action.item.price * action.item.quantity;

    const existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = cartState.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
        itemTotalPrice:
          (existingCartItem.quantity + action.item.quantity) *
          action.item.price,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = cartState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalQuantity: updatedTotalQuantity,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = cartState.items[existingCartItemIndex];

    const updatedTotalQuantity =
      cartState.totalQuantity - existingCartItem.quantity;
    const updatedTotalAmount =
      cartState.totalAmount - existingCartItem.itemTotalPrice;

    const updatedItems = cartState.items.filter(
      (item) => item.id !== action.id
    );

    return {
      items: updatedItems,
      totalQuantity: updatedTotalQuantity,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'RESET') {
    return defaultCartState;
  }

  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );
  const { userUID } = useContext(AuthContext);

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: 'REMOVE', id: id });
  };

  const checkoutCartHandler = async (curTotalAmount) => {
    try {
      const url = `${URL}/${userUID}/expense.json`;
      const response = await fetch(url);
      if (!response.ok) return;
      const data = await response.json();

      if (!data) {
        const prevTotalAmount = 0;
        const updatedTotalAmount = prevTotalAmount + +curTotalAmount;
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(updatedTotalAmount),
        });
      } else {
        const updatedTotalAmount = data + +curTotalAmount;
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(updatedTotalAmount),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetCartHandler = () => {
    dispatchCartState({ type: 'RESET' });
  };

  const cartContext = {
    items: cartState.items,
    totalQuantity: cartState.totalQuantity,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    checkOutCart: checkoutCartHandler,
    resetCart: resetCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
