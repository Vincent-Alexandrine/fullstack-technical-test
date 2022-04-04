import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import api from '../services/api.service';

const cartContext = createContext();

async function createCart (set) {
  const { data: cart } = await api.cart.create();

  localStorage.setItem('cartId', cart.id);
  set(cart);
}

async function getCart (id, set) {
  try {
    const { data: cart } = await api.cart.get(id);
    set(cart);
  } catch (e) {
    localStorage.removeItem('cartId');
    createCart(set);
  }
}

async function addToCart (set, cartId, itemId) {
  const { data: cart } = await api.cart.addToCart(cartId, [{ id: itemId }]);
  set(cart);
}

async function removeFromCart (set, cartId, itemId) {
  const { data: cart } = await api.cart.removeFromCart(cartId, [{ id: itemId }]);
  set(cart);
}

export function CartProvider ({ children }) {
  const [cart, reducer] = useReducer((state, newState) => ({ state, ...newState}), {
    id: '',
    items: [],
  });

  const value = {
    cart,
    addToCart: addToCart.bind(this, reducer, cart.id),
    removeFromCart: removeFromCart.bind(this, reducer, cart.id),
  };

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');

    if (cartId) getCart(cartId, reducer);
    else createCart(reducer);
  }, [reducer]);

  return (
    <cartContext.Provider value={value}>
      {children}
    </cartContext.Provider>
  );
}

CartProvider.propTypes = {
  chldren: PropTypes.node,
};

export function useCart () {
  return useContext(cartContext);
}
