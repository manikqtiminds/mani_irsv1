// frontend/src/services/damageAssessmentService.js
import axios from 'axios';
import apiUrl from '../config/apiConfig';
import { transformAssessmentData } from '../utils/transformers/assessmentTransformer';

export const fetchDamageAssessments = async (referenceNo, imageName) => {
  try {
    console.log('Fetching assessments:', { referenceNo, imageName });
    
    const response = await axios.get(
      `${apiUrl}/api/damageAssessments/${encodeURIComponent(referenceNo)}/${encodeURIComponent(imageName)}`
    );
    
    console.log('Raw response:', response.data);
    const transformedData = transformAssessmentData(response.data);
    console.log('Transformed data:', transformedData);
    
    return transformedData;
  } catch (error) {
    console.error('Failed to fetch damage assessments:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch damage assessments');
  }
};
