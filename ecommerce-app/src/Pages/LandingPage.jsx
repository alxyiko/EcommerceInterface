import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import '../css/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Card className="landing-card">
        <Card.Body>
          <Card.Title className="mb-4">The Walking Dead Telltale's Shop</Card.Title>
          <div className="d-flex flex-column gap-3">
            <Button variant="primary" size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="success" size="lg" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;