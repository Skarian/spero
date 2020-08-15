import React, { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';
import PropTypes from 'prop-types';

const client = Client.buildClient({
  domain: 'snackify-development.myshopify.com',
  storefrontAccessToken: '23fae2e496fcb1c5619977292631a984',
});

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
};

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState({});

  useEffect(() => {
    initializeCheckout();
  }, []);

  const initializeCheckout = async () => {
    try {
      // Check if it's a browser
      const isBrowser = typeof window !== 'undefined';

      // Check if id exists in localStorage
      const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

      let newCheckout = null;

      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId);
      } else {
        // if id does not exist, create new checkout
        newCheckout = await client.checkout.create();
        localStorage.setItem('checkout_id', newCheckout.id);
      }

      // Set the checkout into state with setCheckout
      setCheckout(newCheckout.id);
    } catch (e) {}
  };

  const addProductToCart = async (variantId) => {
    try {
      console.log('added');
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ];
      const addItems = await client.checkout.addLineItems(checkout, lineItems);
      // Buy Now BUtton Code
      // window.open(addItems.webUrl, '_blank');
      console.log(addItems.webUrl);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
