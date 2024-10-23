import React from 'react';
import { useSelector } from 'react-redux';
import './style.css'
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div>Total: ${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
