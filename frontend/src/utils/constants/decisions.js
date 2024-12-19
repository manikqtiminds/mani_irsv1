// frontend/src/utils/constants/decisions.js
export const DECISIONS = {
    REPAIR: 0,
    REPLACE: 1,
    NA: 2
  };
  
  export const DECISION_LABELS = {
    [DECISIONS.REPAIR]: 'Repair',
    [DECISIONS.REPLACE]: 'Replace',
    [DECISIONS.NA]: 'NA'
  };
  
  export const getDecisionLabel = (repairReplaceId) => {
    return DECISION_LABELS[parseInt(repairReplaceId)] || DECISION_LABELS[DECISIONS.NA];
  };
  
  export const getDecisionId = (label) => {
    return Object.entries(DECISION_LABELS)
      .find(([id, text]) => text === label)?.[0] || DECISIONS.NA;
  };
  