import React, { useState, useEffect } from 'react';
import ProductCard from '../NavBarComponents/ProductCard';
import NavbarComponent from '../NavBarComponents/NavbarComponent';
import '../css/Home.css'; // Add CSS for the snackbar

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default'); // State for sorting
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for snackbar message
  const [showSnackbar, setShowSnackbar] = useState(false); // State for snackbar visibility

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

  const handleAddToCart = (productName) => {
    setSnackbarMessage(`${productName} has been added to the cart!`);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // Hide the snackbar after 3 seconds
  };

  return (
    <>
      <NavbarComponent />
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
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
              seller={product.seller}
              description={product.description}
              onDelete={handleDeleteProduct}
              onAddToCart={handleAddToCart} // Pass the add-to-cart handler
            />
          ))}
        </div>
      </div>

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div className="snackbar">
          {snackbarMessage}
        </div>
      )}
    </>
  );
};

export default Home;