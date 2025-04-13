import React, { useState, useEffect } from 'react';
import { fetchCharacters } from '../services/api';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters(page);
        setCharacters(data.content);
        setError(null);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [page]);

  if (loading) {
    return <div className="loading">Loading characters...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="character-list">
      <h2>Rick and Morty Characters</h2>
      <div className="character-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Location: {character.location}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={characters.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList; 