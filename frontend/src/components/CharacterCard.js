import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/animations.css';
import './CharacterCard.css';

const CharacterCard = ({ character, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <Card 
      className={`character-card fade-in`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="character-image-container">
        <Card.Img 
          variant="top" 
          src={character.image} 
          alt={character.name}
          className={`character-image ${isHovered ? 'hovered' : ''}`}
        />
        <div className={`character-info-overlay ${isHovered ? 'visible' : ''}`}>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin?.name || 'Unknown'}</p>
          <p><strong>Location:</strong> {character.location?.name || 'Unknown'}</p>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="character-name">
          <Link to={`/character/${character.id}`} className="text-decoration-none text-dark">
            {character.name}
          </Link>
        </Card.Title>
        <Badge 
          bg={getStatusColor(character.status)}
          className="status-badge"
        >
          {character.status}
        </Badge>
        <div className="character-episodes">
          <small className="text-muted">
            Featured in {character.episodes?.length || 0} episodes
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CharacterCard; 