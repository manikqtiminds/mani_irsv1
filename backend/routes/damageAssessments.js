const express = require('express');
const router = express.Router();
const damageAssessmentService = require('../services/damageAssessmentService');

// Get damage assessment details for an image
router.get('/:referenceNo/:imageName', async (req, res) => {
  try {
    const { referenceNo, imageName } = req.params;
    const assessments = await damageAssessmentService.getDamageAssessmentDetails(referenceNo, imageName);
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching damage assessments:', error);
    res.status(500).json({ error: 'Failed to fetch damage assessments' });
  }
});

// Update damage assessment
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await damageAssessmentService.updateDamageAssessment(id, req.body);
    res.json({ message: 'Damage assessment updated successfully' });
  } catch (error) {
    console.error('Error updating damage assessment:', error);
    res.status(500).json({ error: 'Failed to update damage assessment' });
  }
});

// Create new damage assessment
router.post('/', async (req, res) => {
  try {
    const id = await damageAssessmentService.createDamageAssessment(req.body);
    res.status(201).json({ id, message: 'Damage assessment created successfully' });
  } catch (error) {
    console.error('Error creating damage assessment:', error);
    res.status(500).json({ error: 'Failed to create damage assessment' });
  }
});

// Delete damage assessment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await damageAssessmentService.deleteDamageAssessment(id);
    res.json({ message: 'Damage assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting damage assessment:', error);
    res.status(500).json({ error: 'Failed to delete damage assessment' });
  }
});

module.exports = router;
