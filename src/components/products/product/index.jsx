import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../store/cartSlice';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product">
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default Product;
