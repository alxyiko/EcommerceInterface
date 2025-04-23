import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    if (!fullName || !address || !contactNumber || !emailAddress || !password) {
      setError('All fields are required!');
      return;
    }

    if (!isValidEmail(emailAddress)) {
      setError('Invalid email format! Please include a valid email like "example@gmail.com".');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    try {
      // Retrieve existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the email address already exists
      const userExists = existingUsers.some((user) => user.emailAddress === emailAddress);
      if (userExists) {
        setError('Email address already exists! Please use a different email.');
        return;
      }

      // Add the new user to the list
      const newUser = { fullName, address, contactNumber, emailAddress, password };
      existingUsers.push(newUser);

      // Save the updated users list to localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));

      setError('');
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate('/login'); // Redirect to login
      }, 2000);
    } catch (err) {
      setError('Error saving user data!');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <Container className="register-form">
        <h2 className="form-title mb-4">Sign up</h2>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
                <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Isabel"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Maria"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Rote"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="123-456-7890"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  isInvalid={!!error && (!emailAddress || !isValidEmail(emailAddress))}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!error && (!password || !isValidPassword(password))}
                />
                <Form.Control.Feedback type="invalid">
                  Password must contain at least one uppercase letter, one lowercase letter, and one number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="success" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="secondary" onClick={handleLoginRedirect}>
              Login
            </Button>
          </div>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {showSnackbar && (
          <Alert variant="success" className="mt-3">
            Registration successful! Redirecting to Login...
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Register;