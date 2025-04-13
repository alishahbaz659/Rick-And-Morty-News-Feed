import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const CharacterFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
    });
    onFilterChange({
      name: '',
      status: '',
      species: '',
    });
  };

  return (
    <div className="filter-section">
      <h5 className="mb-3">Filter Characters</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name"
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                name="species"
                value={filters.species}
                onChange={handleFilterChange}
                placeholder="Enter species"
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end mb-3">
            <div className="d-grid gap-2 w-100">
              <Button variant="primary" type="submit">
                Apply
              </Button>
              <Button variant="outline-secondary" type="button" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CharacterFilter; 