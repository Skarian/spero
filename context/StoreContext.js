import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext({
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {
    console.log('added');
  },
});

export const StoreProvider = ({ children }) => (
  <StoreContext.Provider>{children}</StoreContext.Provider>
);

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
