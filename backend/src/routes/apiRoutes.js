/**
 * Express REST API V1 Routes Definition
 */

const express = require('express');
const router = express.Router();
const oceanController = require('../controllers/oceanController');

// Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'OceanEye REST API Engine',
    version: 'v1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Dashboard
router.get('/dashboard', (req, res, next) => oceanController.getDashboard(req, res, next));

// Drones
router.get('/drones', (req, res, next) => oceanController.getDrones(req, res, next));
router.get('/drones/:id', (req, res, next) => oceanController.getDroneById(req, res, next));

// Vision AI Detections
router.get('/vision/detections', (req, res, next) => oceanController.getVisionDetections(req, res, next));

// Coral Scan
router.get('/coral/reefs', (req, res, next) => oceanController.getCoralReefs(req, res, next));

// Species Census
router.get('/species', (req, res, next) => oceanController.getSpecies(req, res, next));

// Ocean Atlas GIS Sectors
router.get('/atlas/sectors', (req, res, next) => oceanController.getSectors(req, res, next));

// AI Risk Engine
router.get('/risk/forecast', (req, res, next) => oceanController.getRiskForecast(req, res, next));

// Analytics
router.get('/analytics', (req, res, next) => oceanController.getAnalytics(req, res, next));

// Alerts & Triage
router.get('/alerts', (req, res, next) => oceanController.getAlerts(req, res, next));
router.patch('/alerts/:id/read', (req, res, next) => oceanController.markAlertRead(req, res, next));
router.patch('/alerts/:id/archive', (req, res, next) => oceanController.archiveAlert(req, res, next));

// Weather
router.get('/weather', (req, res, next) => oceanController.getWeather(req, res, next));

// Profile & Settings
router.get('/profile', (req, res, next) => oceanController.getProfile(req, res, next));
router.get('/settings', (req, res, next) => oceanController.getSettings(req, res, next));

module.exports = router;
