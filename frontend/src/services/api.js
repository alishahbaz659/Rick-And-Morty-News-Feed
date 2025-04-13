import axios from 'axios';

const API_URL = '/api/characters';

export const fetchCharacters = async (page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
  try {
    const response = await axios.get(`${API_URL}/feed`, {
      params: { page, size, sortBy, sortDirection }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchFilteredCharacters = async (filters, page = 0, size = 10, sortBy = 'id', sortDirection = 'asc') => {
  try {
    const response = await axios.get(`${API_URL}/feed`, {
      params: { 
        ...filters,
        page, 
        size, 
        sortBy, 
        sortDirection 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
}; 