import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CharacterDetail from '../components/CharacterDetail';
import { fetchCharacterById } from '../services/api';
import './CharacterDetailPage.css';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reset states when component mounts or ID changes
    setLoading(true);
    setAnimateIn(false);
    setShowContent(false);
    
    const loadCharacter = async () => {
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
        setError(null);
        
        // Show content container first
        setShowContent(true);
        
        // Trigger animation after content is visible
        setTimeout(() => setAnimateIn(true), 100);
      } catch (err) {
        setError(`Failed to load character with ID ${id}. The character might not exist.`);
        setShowContent(true);
        setTimeout(() => setAnimateIn(true), 100);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
    
    // Reset animation state when component unmounts
    return () => {
      setAnimateIn(false);
      setShowContent(false);
    };
  }, [id]);

  // Smart back function checks if we should use browser history or home page redirect
  const handleBack = () => {
    try {
      // Check if we have a state in localStorage indicating we came from a specific page
      const pageStateStr = localStorage.getItem('rickAndMorty_pageState');
      
      if (pageStateStr) {
        // We have a saved state, use browser history which will preserve the state
        navigate(-1);
      } else {
        // No saved state, just go to homepage
        navigate('/');
      }
    } catch (e) {
      // If anything goes wrong, fall back to basic navigation
      navigate('/');
    }
  };

  return (
    <Container className={`character-detail-container ${showContent ? 'content-ready' : ''}`}>
      <Button 
        variant="outline-secondary" 
        onClick={handleBack} 
        className={`mb-4 back-button ${animateIn ? 'fade-in' : ''}`}
      >
        &larr; Back to Characters
      </Button>

      {loading && (
        <div className="text-center my-5 spinner-container">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger" className={`error-alert ${animateIn ? 'fade-in' : ''}`}>{error}</Alert>}

      {!loading && !error && character && (
        <div className={`character-detail-wrapper ${animateIn ? 'fade-in' : ''}`}>
          <CharacterDetail character={character} />
        </div>
      )}
    </Container>
  );
};

export default CharacterDetailPage;