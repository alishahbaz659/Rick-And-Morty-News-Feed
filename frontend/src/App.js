import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import { Container } from 'react-bootstrap';

function App() {
  const location = useLocation();
  
  // Clear page state when directly accessing character detail pages
  useEffect(() => {
    // If user directly lands on a detail page (not from the list), we should reset the page state
    if (location.pathname.includes('/character/') && !document.referrer.includes(window.location.origin)) {
      localStorage.removeItem('rickAndMorty_pageState');
    }
  }, [location.pathname]);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 py-4 main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App; 