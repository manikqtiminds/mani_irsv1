// src/services/api/damageAssessmentApi.js
import axios from 'axios';
import apiUrl from '../../config/apiConfig';

export const damageAssessmentApi = {
  fetch: async (referenceNo, imageName) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/damageAssessments/${encodeURIComponent(referenceNo)}/${encodeURIComponent(imageName)}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch assessments');
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/damageAssessments`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create assessment');
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${apiUrl}/api/damageAssessments/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update assessment');
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/damageAssessments/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete assessment');
    }
  }
};
