import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa'; 
import '../css/MyProfile.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editableEmail, setEditableEmail] = useState('');
  const [editableUsername, setEditableUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = existingUsers[existingUsers.length - 1];
    if (loggedInUser) {
      setUser(loggedInUser);
      setEditableEmail(loggedInUser.emailAddress);
      setEditableUsername(loggedInUser.firstName);
    }
  }, []);

  const handleSaveChanges = () => {
    if (user) {
      const updatedUser = { ...user, emailAddress: editableEmail, firstName: editableUsername };
      setUser(updatedUser);

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = existingUsers.map((u) =>
        u.emailAddress === user.emailAddress ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Profile updated successfully!');
    }
  };

  const handleLogout = () => {
    alert('You have been logged out.');
    navigate('/login');
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="my-profile-page">
      <Container className="my-profile-container">
        <h2 className="mb-2">My Profile</h2>
        <p className="subtitle mb-4">You can only edit your username and change email.</p> {/* Added subtitle */}
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name (Username)</Form.Label>
                <Form.Control
                  type="text"
                  value={editableUsername}
                  onChange={(e) => setEditableUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" value={user.middleName} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={user.lastName} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editableEmail}
                  onChange={(e) => setEditableEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={user.contactNumber} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control type="text" value={user.street} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Province</Form.Label>
                <Form.Control type="text" value={user.province} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={user.city} readOnly />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={user.postalCode} readOnly />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button variant="primary" onClick={handleSaveChanges} title="Save Changes">
              <FaSave />
            </Button>
            <Button variant="secondary" onClick={handleGoBack} title="Go Back">
              <FaArrowLeft />
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default MyProfile;