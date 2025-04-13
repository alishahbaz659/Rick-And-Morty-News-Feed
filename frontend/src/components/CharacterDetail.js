import React from 'react';
import { Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';

const CharacterDetail = ({ character }) => {
  if (!character) {
    return <div>Loading character details...</div>;
  }

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Format date for better display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Row>
      <Col md={4} className="mb-4 mb-md-0">
        <Card className="border-0 shadow-sm character-image-container">
          <Card.Img 
            variant="top" 
            src={character.image} 
            alt={character.name} 
            className="img-fluid"
          />
          <div className="character-image-overlay">
            <h4>{character.name}</h4>
            <p>First appeared: {formatDate(character.created)}</p>
          </div>
        </Card>
      </Col>
      <Col md={8} className="character-info">
        <h1 className="mb-3">{character.name}</h1>
        
        <div className="mb-4 info-group">
          <Badge 
            bg={getStatusBadgeVariant(character.status)} 
            className="me-2 py-2 px-3"
          >
            {character.status}
          </Badge>
          <Badge bg="info" className="me-2 py-2 px-3">
            {character.species}
          </Badge>
          {character.type && (
            <Badge bg="dark" className="py-2 px-3">
              {character.type}
            </Badge>
          )}
        </div>
        
        <Card className="mb-4 shadow-sm info-group">
          <Card.Header as="h5">Character Information</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Gender:</strong> {character.gender}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Origin:</strong> {character.origin?.name || 'Unknown'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Known Location:</strong> {character.location?.name || 'Unknown'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Created:</strong> {formatDate(character.created)}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        
        {character.episodes && character.episodes.length > 0 && (
          <Card className="shadow-sm info-group">
            <Card.Header as="h5">Episodes</Card.Header>
            <ListGroup variant="flush" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {character.episodes.map((episode) => (
                <ListGroup.Item key={episode.id}>
                  <div className="d-flex justify-content-between">
                    <span>{episode.name}</span>
                    <span className="text-muted">{episode.episode}</span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default CharacterDetail; 