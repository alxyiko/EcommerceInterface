import React, { useState, useEffect } from 'react';
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
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
    alert(`You have purchased ${item.name} for $${item.price * item.quantity}`);
    handleRemoveItem(index); // Remove the item after purchase
  };

  const handlePurchaseAll = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`You have purchased all items for $${totalCost}`);
    setCartItems([]); // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    setTotalCost(0); // Reset total cost
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
          <Button variant="primary" onClick={handlePurchaseAll}>
            Purchase All
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Cart;