import React, { useContext, useState } from 'react';
import { red } from '@material-ui/core/colors';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
  const {
    isCartOpen, checkout, removeProductFromCart, checkCoupon,
  } = useContext(StoreContext);
  const [coupon, setCoupon] = useState('');
  console.log(coupon);

  const qty = checkout.lineItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div
      style={{
        border: '1px red solid',
      }}
    >
      <h3>Cart</h3>
      {checkout.lineItems.map((item) => (
        <div key={item.id} style={{ border: '1px gray solid' }}>
          <h4>{item.title}</h4>
          <h4>{item.quantity}</h4>
          <h4>{item.variant.price}</h4>
          <button
            style={{ background: 'red', color: 'white' }}
            onClick={() => {
              removeProductFromCart(item.id);
              // console.log(item);
            }}
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
      <h2>
        Checkout:
        {checkout.totalPrice}
      </h2>
      <h2>
        Total Quantity:
        {qty}
      </h2>
      <a href={checkout.webUrl}>
        <button style={{ background: 'green', color: 'white' }} type="button">
          Checkout
        </button>
      </a>
      <button
        type="button"
        onClick={() => {
          checkCoupon('NEIL');
        }}
      >
        Add 'NEIL' Coupon
      </button>
    </div>
  );
};

export default Cart;
