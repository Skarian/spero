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
  removeProductFromCart: () => {},
  updateCheckoutAttribute: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
};

const isBrowser = typeof window !== 'undefined';

export const StoreContext = createContext(defaultValues);

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValues.checkout);

  useEffect(() => {
    initializeCheckout();
  }, []);

  const getNewCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create();
      if (isBrowser) {
        localStorage.setItem('checkout_id', newCheckout.id);
      }
      return newCheckout;
    } catch (e) {
      console.error(e);
    }
  };

  const initializeCheckout = async () => {
    try {
      // Check if it's a browser

      // Check if id exists in localStorage
      const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

      let newCheckout = null;

      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId);
        if (newCheckout.completedAt) {
          newCheckout = await getNewCheckout();
        }
      } else {
        // if id does not exist, create new checkout
        newCheckout = await getNewCheckout();
      }

      // Set the checkout into state with setCheckout
      setCheckout(newCheckout);
    } catch (e) {}
  };

  const addProductToCart = async (variantId) => {
    try {
      console.log('added');
      const lineItems = [
        {
          variantId,
          quantity: 1,
          customAttributes: [{ key: 'MyKey', value: 'MyValue' }],
        },
      ];
      const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);
      setCheckout(newCheckout);
    } catch (e) {
      console.error(e);
    }
  };
  const removeProductFromCart = async (lineItemId) => {
    try {
      console.log('removed');
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
      setCheckout(newCheckout);
    } catch (e) {
      console.error(e);
    }
  };

  const checkCoupon = async (coupon) => {
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon);
    setCheckout(newCheckout);
  };

  const updateCheckoutAttribute = async () => {
    const newCheckout = await client.checkout.updateAttributes(checkout.id, {
      customAttributes: [{ key: 'myKey', value: 'MyValue' }],
    });
    setCheckout(newCheckout);
  };

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        checkout,
        addProductToCart,
        removeProductFromCart,
        checkCoupon,
        updateCheckoutAttribute,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
