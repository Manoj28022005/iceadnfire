import React, { useState } from "react";
import { useDispatch } from '../ContextReducer';

function Card({ title, image, description, price, id }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, price, quantity, image },
    });
    setAddedToCart(true); // Show the tick mark
    setTimeout(() => setAddedToCart(false), 1000); // Hide the tick mark after 1 second
  };

  const imageUrl = `/${image}`;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div>
        <div className="card mt-1 mb-2" style={{ width: "22rem", maxHeight: "500px" }}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            style={{ height: "250px", width: "100%", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {Array.from(Array(10), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5"><b>Total: ₹{price * quantity}</b></div>
              <button onClick={handleAddToCart} className="btn btn-primary m-2">
                {addedToCart ? '✔ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
