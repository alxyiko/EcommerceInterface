import React, { useState } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sellerName, setSellerName] = useState(''); // New state for seller's name

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = async () => {
    if (!name || !price || !description || !image || !sellerName) {
      alert('Please fill in all fields!');
      return;
    }

    const userConfirmed = window.confirm('Are you sure you want to add this product?');
    if (!userConfirmed) return;

    try {
      const base64Image = await convertToBase64(image);
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

      const newProduct = {
        id: existingProducts.length + 1,
        name,
        price,
        description,
        image: base64Image,
        seller: sellerName, // Include seller's name
      };

      localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));

      alert('Product added successfully!');
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
      setSellerName(''); // Reset seller's name field
    } catch (error) {
      console.error('Error converting image to Base64:', error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5 add-product-container">
        <h2 className="text-center mb-4">Add Product</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="form-label-black">Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-black">Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-black">Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-black">Seller desired alias/username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="form-label-black">Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          {imagePreview && (
            <div className="text-center mb-3">
              <Image
                src={imagePreview}
                alt="Product Preview"
                fluid
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}

          <div className="d-flex justify-content-start">
            <Button variant="primary" onClick={handleAdd}>
              Add Product
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddProduct;