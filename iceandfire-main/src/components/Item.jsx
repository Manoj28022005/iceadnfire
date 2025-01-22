import React from 'react';
import { useDispatch } from './ContextReducer'; // Importing the dispatcher

function Item({ item }) {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity: 1 }
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div>
      <h4>{item.name}</h4>
      <p>Price: ${item.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Item;
