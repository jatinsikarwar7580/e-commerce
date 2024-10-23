import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <nav className="navbar">
      <h1>E-Commerce App</h1>
      <div>
        Cart: {totalQuantity} items | Total Price: ${totalPrice.toFixed(2)}
      </div>
      <Link to="/checkout">
        <button className="checkout-btn">Go to Checkout</button>
      </Link>
    </nav>
  );
};

export default Navbar;
