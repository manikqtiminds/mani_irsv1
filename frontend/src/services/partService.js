// frontend/src/services/partService.js
import axios from 'axios';
import apiUrl from '../config/apiConfig';

export const fetchPartNames = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/carParts`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch part names:', error);
    throw new Error('Failed to fetch part names');
  }
};

export const fetchPartDetails = async (partId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/carParts/${partId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch part details:', error);
    throw new Error('Failed to fetch part details');
  }
};
