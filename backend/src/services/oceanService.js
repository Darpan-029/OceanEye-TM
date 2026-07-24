/**
 * Ocean Service
 * Business Logic Layer for OceanEye
 */

const oceanRepository = require('../repositories/oceanRepository');

class OceanService {
  async getDashboardOverview() {
    return await oceanRepository.getDashboardData();
  }

  async fetchDrones(query) {
    return await oceanRepository.getDrones(query);
  }

  async fetchDroneById(id) {
    const drone = await oceanRepository.getDroneById(id);
    if (!drone) {
      const err = new Error(`Drone with ID ${id} not found.`);
      err.statusCode = 404;
      throw err;
    }
    return drone;
  }

  async fetchVisionDetections(query) {
    return await oceanRepository.getVisionDetections(query);
  }

  async fetchCoralReefs() {
    return await oceanRepository.getCoralReefs();
  }

  async fetchSpecies(query) {
    return await oceanRepository.getSpecies(query);
  }

  async fetchSectors() {
    return await oceanRepository.getSectors();
  }

  async fetchRiskForecast() {
    return await oceanRepository.getRiskForecast();
  }

  async fetchAnalytics() {
    return await oceanRepository.getAnalytics();
  }

  async fetchAlerts(query) {
    return await oceanRepository.getAlerts(query);
  }

  async markAlertRead(id) {
    const updated = await oceanRepository.updateAlertReadStatus(id, true);
    if (!updated) {
      const err = new Error(`Alert with ID ${id} not found.`);
      err.statusCode = 404;
      throw err;
    }
    return updated;
  }

  async archiveAlert(id) {
    const updated = await oceanRepository.archiveAlert(id);
    if (!updated) {
      const err = new Error(`Alert with ID ${id} not found.`);
      err.statusCode = 404;
      throw err;
    }
    return updated;
  }

  async fetchWeather() {
    return await oceanRepository.getWeather();
  }

  async fetchProfile() {
    return await oceanRepository.getProfile();
  }

  async fetchSettings() {
    return await oceanRepository.getSettings();
  }
}

module.exports = new OceanService();
