import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
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
            <Nav.Link as={Link} to="/home" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-link">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="nav-link">
              Add Product
            </Nav.Link>
            <Button variant="outline-light" className="ms-3" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;