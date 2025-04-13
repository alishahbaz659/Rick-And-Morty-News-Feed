import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(window.scrollY > 50);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const ticking = useRef(false);
  const scrollY = useRef(window.scrollY);

  // Throttled scroll handler with pre-applied class
  const handleScroll = useCallback(() => {
    // Store current scroll position
    scrollY.current = window.scrollY;
    
    if (!ticking.current) {
      ticking.current = true;
      
      // Use a shorter timeout for better responsiveness
      window.setTimeout(() => {
        const isScrolled = scrollY.current > 50;
        if (isScrolled !== scrolled) {
          setScrolled(isScrolled);
        }
        ticking.current = false;
      }, 10);
    }
  }, [scrolled]);

  // Initialize on mount to prevent flicker
  useEffect(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    // Add passive listener to improve scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="brand-wrapper">
            <div className="rick-icon-group">
              <i className="fas fa-flask"></i>
            </div>
            <span className="brand-title">Rick and Morty</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler-btn">
          <span className="toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              <span className="nav-icon"><i className="fas fa-home"></i></span>
              <span className="nav-text">Home</span>
            </Nav.Link>
            <Nav.Link 
              href="https://rickandmortyapi.com/" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nav-icon"><i className="fas fa-database"></i></span>
              <span className="nav-text">API</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 