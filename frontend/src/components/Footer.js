import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">© {new Date().getFullYear()} Rick and Morty Newsfeed</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              Powered by <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="text-light">The Rick and Morty API</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 