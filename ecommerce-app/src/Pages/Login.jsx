import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import '../css/Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Retrieve the list of registered users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username and password match any user in the list
    const user = existingUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError('');
      navigate('/home'); // Redirect to home page
    } else {
      setError('Invalid username or password!');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to registration page
  };

  return (
    <div className="login-container">
      <Container className="login-form">
        <h2 className="text-center mb-4">Sign in</h2>
        <Form>
          <div className="form-row">
            <Form.Group className="mb-3 me-3 flex-grow-1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="garcia@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 flex-grow-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="secondary" onClick={handleRegisterRedirect}>
              Register
            </Button>
          </div>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Login;