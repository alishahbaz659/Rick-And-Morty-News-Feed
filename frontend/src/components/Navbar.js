import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
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
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <div className="logo-container">
            <i className="fas fa-flask portal-icon"></i>
            <span className="brand-text">Rick and Morty Portal</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav">
          <span className="custom-toggler" />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Dimension C-137
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/characters" 
                className={location.pathname === '/characters' ? 'active' : ''}
              >
                Characters
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/episodes" 
                className={location.pathname === '/episodes' ? 'active' : ''}
              >
                Episodes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                href="https://rickandmortyapi.com/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                Interdimensional DB
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 