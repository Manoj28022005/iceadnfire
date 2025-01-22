import React from 'react';
import { useCart, useDispatch } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

function Cart({ darkMode, showCartModal, setShowCartModal }) {
  const cartItems = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    setShowCartModal(false);
  };

  const handleDelete = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (window.confirm("Are you sure you want to place this order?")) {
      closeModal();

      const totalPrice=calculateTotal();
      navigate('/payment', {state: {cartItems,totalPrice}});
    }
  };

  return (
    <>
      {showCartModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
              <div className="modal-header">
                <h5 className="modal-title">My Cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {cartItems.length > 0 ? (
                  <table className={`table ${darkMode ? 'table-dark' : ''}`}>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>ITEM NAME</th>
                        <th>QUANTITY</th>
                        <th>PRICE(₹)</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>{(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Your cart is empty.</p>
                )}
                <h5 className="mt-3">Total: ₹{calculateTotal()}</h5>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                {cartItems.length > 0 && (
                  <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
