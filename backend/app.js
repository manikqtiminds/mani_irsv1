const express = require('express');
const cors = require('cors');
const referenceNumbersRoutes = require('./routes/referenceNumbers');
const imagesRoutes = require('./routes/images');
const damageAnnotationsRoutes = require('./routes/damageAnnotations');
const carPartsRoutes = require('./routes/carParts');
const reportsRoutes = require('./routes/reports');
const damageAssessmentsRoutes = require('./routes/damageAssessments');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/referenceNumbers', referenceNumbersRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/damageAnnotations', damageAnnotationsRoutes);
app.use('/api/carParts', carPartsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/damageAssessments', damageAssessmentsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});