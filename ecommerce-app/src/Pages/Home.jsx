import React, { useState, useEffect } from 'react';
import ProductCard from '../NavBarComponents/ProductCard';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/Home.css'; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <>
      <NavbarComponent />
      <div className="home-container">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              onDelete={handleDeleteProduct} // Pass the delete handler
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;