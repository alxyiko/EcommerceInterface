import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faStore } from '@fortawesome/free-solid-svg-icons'; 
import '../css/NavBarComponent.css';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="navbar-brand">
          The Walking Dead Telltale E-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/start-selling" className="nav-link">
              <FontAwesomeIcon icon={faStore} className="me-2" /> Start Selling
            </Nav.Link>
            <Nav.Link as={Link} to="/home" className="nav-link">
              Product List
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-link">
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="nav-link">
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="nav-link">
              <FontAwesomeIcon icon={faUser} className="me-2" /> {/* Profile icon */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;