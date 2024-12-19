// src/hooks/useDamageAssessment/api.js
import { damageAssessmentApi } from '../../services/api/damageAssessmentApi';
import { prepareAssessmentForSave } from './utils';

export const saveAssessments = async (assessments) => {
  const prepared = assessments.map(prepareAssessmentForSave);
  return await damageAssessmentApi.bulkUpdate(prepared);
};
