import React, { useState } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';

const ProductCard = ({ id, name, category, price, image, onDelete }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = { id, name, category, price, quantity, image };
    localStorage.setItem('cart', JSON.stringify([...cartItems, newItem]));
    alert(`${name} has been added to the cart!`);
  };

  const handleDelete = () => {
    onDelete(id); // Call the delete handler passed from Home
    setShowModal(false);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <>
      <Card className="h-100" onClick={handleModalShow} style={{ cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: 'left', fontWeight: 'bold' }}>{name}</Card.Title>
          <Card.Text style={{ textAlign: 'left' }}>
            <strong>Category:</strong> {category} <br />
            <strong>Price:</strong> ${price} <br />
            <strong>Product ID:</strong> {id}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src={image}
              alt={name}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ textAlign: 'left', marginTop: '20px' }}>
            <p>
              <strong>Category:</strong> {category} <br />
              <strong>Price:</strong> ${price} <br />
              <strong>Product ID:</strong> {id}
            </p>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;