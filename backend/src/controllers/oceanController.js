/**
 * Ocean Controller
 * Express Request/Response Handlers
 */

const oceanService = require('../services/oceanService');
const { formatSuccess, formatError } = require('../utils/response');

class OceanController {
  async getDashboard(req, res, next) {
    try {
      const data = await oceanService.getDashboardOverview();
      return res.status(200).json(formatSuccess(data, "Dashboard data retrieved successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getDrones(req, res, next) {
    try {
      const drones = await oceanService.fetchDrones(req.query);
      return res.status(200).json(formatSuccess(drones, "Fleet telemetry data retrieved successfully"));
    } catch (err) {
      next(err);
    }
  }

  async getDroneById(req, res, next) {
    try {
      const drone = await oceanService.fetchDroneById(req.params.id);
      return res.status(200).json(formatSuccess(drone, `Drone details for ${req.params.id}`));
    } catch (err) {
      next(err);
    }
  }

  async getVisionDetections(req, res, next) {
    try {
      const detections = await oceanService.fetchVisionDetections(req.query);
      return res.status(200).json(formatSuccess(detections, "VisionAI detection history fetched"));
    } catch (err) {
      next(err);
    }
  }

  async getCoralReefs(req, res, next) {
    try {
      const reefs = await oceanService.fetchCoralReefs();
      return res.status(200).json(formatSuccess(reefs, "Coral reef health status retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getSpecies(req, res, next) {
    try {
      const species = await oceanService.fetchSpecies(req.query);
      return res.status(200).json(formatSuccess(species, "Marine census data retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getSectors(req, res, next) {
    try {
      const sectors = await oceanService.fetchSectors();
      return res.status(200).json(formatSuccess(sectors, "Ocean GIS sectors retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getRiskForecast(req, res, next) {
    try {
      const forecast = await oceanService.fetchRiskForecast();
      return res.status(200).json(formatSuccess(forecast, "AI Risk Forecast retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      const analytics = await oceanService.fetchAnalytics();
      return res.status(200).json(formatSuccess(analytics, "Historical analytics data retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getAlerts(req, res, next) {
    try {
      const alerts = await oceanService.fetchAlerts(req.query);
      return res.status(200).json(formatSuccess(alerts, "System alerts retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async markAlertRead(req, res, next) {
    try {
      const alert = await oceanService.markAlertRead(req.params.id);
      return res.status(200).json(formatSuccess(alert, `Alert ${req.params.id} marked as read`));
    } catch (err) {
      next(err);
    }
  }

  async archiveAlert(req, res, next) {
    try {
      const alert = await oceanService.archiveAlert(req.params.id);
      return res.status(200).json(formatSuccess(alert, `Alert ${req.params.id} archived`));
    } catch (err) {
      next(err);
    }
  }

  async getWeather(req, res, next) {
    try {
      const weather = await oceanService.fetchWeather();
      return res.status(200).json(formatSuccess(weather, "Oceanographic weather retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await oceanService.fetchProfile();
      return res.status(200).json(formatSuccess(profile, "User profile retrieved"));
    } catch (err) {
      next(err);
    }
  }

  async getSettings(req, res, next) {
    try {
      const settings = await oceanService.fetchSettings();
      return res.status(200).json(formatSuccess(settings, "Platform settings retrieved"));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OceanController();
