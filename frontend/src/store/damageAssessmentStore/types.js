// src/store/damageAssessmentStore/types.js

/**
 * @typedef {Object} Assessment
 * @property {number} id
 * @property {string} partName
 * @property {string} metallurgy
 * @property {string} decision
 * @property {number} price
 * @property {boolean} [isModified]
 */

/**
 * @typedef {Object} DamageAssessmentState
 * @property {Array<Assessment>} assessments
 * @property {Array<number>} selectedRows
 * @property {Set<number>} editingRows
 * @property {boolean} hasUnsavedChanges
 * @property {boolean} loading
 * @property {string|null} error
 */
