import React, { useState, useEffect } from 'react';
import { Container, Table, Button, ButtonGroup, Modal } from 'react-bootstrap';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for showing the confirmation modal
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [isCartEmpty, setIsCartEmpty] = useState(false); // State to check if the cart is empty
  const [purchaseHistory, setPurchaseHistory] = useState([]); // State for purchase history
  const [showHistoryModal, setShowHistoryModal] = useState(false); // State for showing purchase history modal

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    setCartItems(storedCart);
    setPurchaseHistory(storedHistory);
    calculateTotalCost(storedCart);
  }, []);

  const calculateTotalCost = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalCost(updatedCart);
  };

  const handlePurchaseItem = (index) => {
    const item = cartItems[index];
    const updatedHistory = [...purchaseHistory, { ...item, purchasedAt: new Date().toLocaleString() }];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

    alert(`You have purchased ${item.name} for $${item.price * item.quantity}`);
    handleRemoveItem(index); // Remove the item after purchase
  };

  const handlePurchaseAll = () => {
    const updatedHistory = [
      ...purchaseHistory,
      ...cartItems.map((item) => ({ ...item, purchasedAt: new Date().toLocaleString() })),
    ];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

    setCartItems([]); // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    setTotalCost(0); // Reset total cost
    setShowModal(false); // Close the modal
    alert(`You have purchased all items for $${totalCost}`);
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += delta;

    // Ensure quantity doesn't go below 1
    if (updatedCart[index].quantity < 1) {
      updatedCart[index].quantity = 1;
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalCost(updatedCart);
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      setModalMessage("You don't have any items in your cart");
      setIsCartEmpty(true); // Set cart empty state
    } else {
      setModalMessage(`Are you sure you want to purchase all items in your cart for $${totalCost}?`);
      setIsCartEmpty(false); // Set cart not empty state
    }
    setShowModal(true);
  };

  const handleShowHistory = () => {
    setShowHistoryModal(true);
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td>${item.price * item.quantity}</td> {/* Total cost for the item */}
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handlePurchaseItem(index)}
                  >
                    Purchase
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4>Total Cost: ${totalCost}</h4>
          <div>
            <Button variant="secondary" className="me-2" onClick={handleShowHistory}>
              View Purchase History
            </Button>
            <Button variant="primary" onClick={handleCheckoutClick}>
              Place Checkout
            </Button>
          </div>
        </div>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isCartEmpty ? "No items in the cart :(" : "Confirm Purchase"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowModal(false)}
          >
            {isCartEmpty ? "Okay" : "No"}
          </Button>
          {!isCartEmpty && (
            <Button variant="primary" onClick={handlePurchaseAll}>
              Yes
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Purchase History Modal */}
      <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Purchase History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {purchaseHistory.length === 0 ? (
            <p>You have no purchase history.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Purchased At</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                    <td>{item.purchasedAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;