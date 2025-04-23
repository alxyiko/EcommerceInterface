import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const provinces = [
    'Metro Manila',
    'Cebu',
    'Davao del Sur',
    'Benguet',
    'Laguna',
    'Batangas',
    'Pampanga',
    'Bulacan',
    'Rizal',
    'Cavite',
  ];

  const cities = {
    'Metro Manila': ['Manila', 'Quezon City', 'Makati', 'Pasig', 'Taguig'],
    Cebu: ['Cebu City', 'Mandaue', 'Lapu-Lapu'],
    'Davao del Sur': ['Davao City', 'Digos'],
    Benguet: ['Baguio'],
    Laguna: ['Calamba', 'San Pablo', 'Santa Rosa'],
    Batangas: ['Batangas City', 'Lipa', 'Tanauan'],
    Pampanga: ['Angeles', 'San Fernando'],
    Bulacan: ['Malolos', 'Meycauayan', 'San Jose del Monte'],
    Rizal: ['Antipolo', 'Cainta', 'Taytay'],
    Cavite: ['Dasmariñas', 'Bacoor', 'Imus'],
  };

  const handleRegister = () => {
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !emailAddress ||
      !contactNumber ||
      !street ||
      !province ||
      !city ||
      !postalCode ||
      !password ||
      !confirmPassword
    ) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const isDuplicate = existingUsers.some(user => user.username === emailAddress);
    if (isDuplicate) {
      setError('An account with this email already exists!');
      return;
    }

    // Save user credentials to localStorage
    const newUser = {
      username: emailAddress,
      password: password,
    };

    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    setError('');
    alert('Registration successful!');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="register-container">
      <Container className="register-form">
        <h2 className="form-title mb-4">Create New Account</h2>
        <p className="form-subtitle"></p>
        <Form>
          <Row>
            {/* Left Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your middle name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* Right Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your street address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Province</Form.Label>
                <Form.Control
                  as="select"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setCity('');
                  }}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!province}
                >
                  <option value="">Select your province first!</option>
                  {province &&
                    cities[province]?.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button variant="link" onClick={() => navigate('/login')}>
              Go Back to Login
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
