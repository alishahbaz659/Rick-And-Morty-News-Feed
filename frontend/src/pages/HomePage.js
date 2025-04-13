import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import CharacterCard from '../components/CharacterCard';
import CharacterFilter from '../components/CharacterFilter';
import CharactersPagination from '../components/CharactersPagination';
import { fetchFilteredCharacters } from '../services/api';

// Storage key for page state
const PAGE_STATE_KEY = 'rickAndMorty_pageState';

const HomePage = () => {
  // Initialize state from localStorage if available
  const getSavedState = () => {
    try {
      const savedState = localStorage.getItem(PAGE_STATE_KEY);
      return savedState ? JSON.parse(savedState) : null;
    } catch (e) {
      console.error('Error loading saved state:', e);
      return null;
    }
  };

  const savedState = getSavedState();
  
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(savedState?.currentPage || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(savedState?.pageSize || 12);
  const [filters, setFilters] = useState(savedState?.filters || {});
  const [sortConfig, setSortConfig] = useState(savedState?.sortConfig || { sortBy: 'id', sortDirection: 'asc' });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      currentPage,
      pageSize,
      filters,
      sortConfig
    };
    localStorage.setItem(PAGE_STATE_KEY, JSON.stringify(stateToSave));
  }, [currentPage, pageSize, filters, sortConfig]);

  const loadCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetchFilteredCharacters(
        filters,
        currentPage,
        pageSize,
        sortConfig.sortBy,
        sortConfig.sortDirection
      );
      setCharacters(response.characters);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
      setError(null);
    } catch (err) {
      setError('Failed to load characters. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, [currentPage, pageSize, filters, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    const [sortBy, sortDirection] = value.split('-');
    setSortConfig({ sortBy, sortDirection });
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page on page size change
  };

  return (
    <Container className="homepage-container">
      <h1 className="text-center mb-4 page-title">Rick and Morty Character Feed</h1>
      
      <CharacterFilter onFilterChange={handleFilterChange} />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          {!loading && !error && (
            <p className="mb-0">
              Showing {characters.length} of {totalItems} characters
            </p>
          )}
        </div>
        <div className="d-flex">
          <Form.Group className="me-3">
            <Form.Select
              value={`${sortConfig.sortBy}-${sortConfig.sortDirection}`}
              onChange={handleSortChange}
              aria-label="Sort by"
            >
              <option value="id-asc">Sort by ID (Ascending)</option>
              <option value="id-desc">Sort by ID (Descending)</option>
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Select
              value={pageSize}
              onChange={handlePageSizeChange}
              aria-label="Items per page"
            >
              <option value={4}>4 per page</option>
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && !error && characters.length === 0 && (
        <Alert variant="info">
          No characters found matching your search criteria. Try adjusting your filters.
        </Alert>
      )}
      
      {!loading && !error && characters.length > 0 && (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
            {characters.map((character) => (
              <Col key={character.id}>
                <CharacterCard character={character} />
              </Col>
            ))}
          </Row>
          
          <div className="pagination-container">
            <CharactersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default HomePage; 