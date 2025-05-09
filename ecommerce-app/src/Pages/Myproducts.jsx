import React, { useState, useEffect } from 'react';
import ProductCard from '../NavBarComponents/ProductCard';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/Home.css'; // Reuse the same CSS as Home

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default'); // State for sorting

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortProducts = (products) => {
    if (sortOption === 'priceLowToHigh') {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'priceHighToLow') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    if (sortOption === 'nameAZ') {
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === 'nameZA') {
      return [...products].sort((a, b) => b.name.localeCompare(a.name));
    }
    return products; // Default order
  };

  const filteredProducts = sortProducts(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <NavbarComponent />
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for your products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="filter-dropdown"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="default">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>
      <div className="home-container">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
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

export default MyProducts;