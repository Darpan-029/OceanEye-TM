/**
 * Ocean Repository
 * Data Access Layer for OceanEye. Currently interacts with mockStore JSON data.
 * Designed to seamlessly interface with Mongoose / MongoDB schemas in production.
 */

const mockStore = require('../mockData/store');

class OceanRepository {
  async getDashboardData() {
    return {
      kpis: mockStore.kpis,
      dronesSummary: mockStore.drones.slice(0, 4),
      topDetections: mockStore.visionDetections.slice(0, 3),
      coralSummary: mockStore.coralReefs,
      liveFeed: mockStore.liveEvents,
      weather: mockStore.weather,
      riskIndexScore: mockStore.riskEngine.overallRiskScore
    };
  }

  async getDrones(filter = {}) {
    let drones = [...mockStore.drones];
    if (filter.status) {
      drones = drones.filter(d => d.status.toLowerCase() === filter.status.toLowerCase());
    }
    if (filter.sector) {
      drones = drones.filter(d => d.sector.toLowerCase() === filter.sector.toLowerCase());
    }
    return drones;
  }

  async getDroneById(id) {
    return mockStore.drones.find(d => d.id === id) || null;
  }

  async getVisionDetections(filter = {}) {
    let detections = [...mockStore.visionDetections];
    if (filter.severity) {
      detections = detections.filter(d => d.severity.toLowerCase() === filter.severity.toLowerCase());
    }
    if (filter.category) {
      detections = detections.filter(d => d.category.toLowerCase() === filter.category.toLowerCase());
    }
    return detections;
  }

  async getCoralReefs() {
    return mockStore.coralReefs;
  }

  async getSpecies(filter = {}) {
    let speciesList = [...mockStore.species];
    if (filter.status) {
      speciesList = speciesList.filter(s => s.status.toLowerCase() === filter.status.toLowerCase());
    }
    return speciesList;
  }

  async getSectors() {
    return mockStore.sectors;
  }

  async getRiskForecast() {
    return mockStore.riskEngine;
  }

  async getAnalytics() {
    return mockStore.analytics;
  }

  async getAlerts(filter = {}) {
    let alerts = [...mockStore.alerts];
    if (filter.severity) {
      alerts = alerts.filter(a => a.severity.toLowerCase() === filter.severity.toLowerCase());
    }
    if (filter.unreadOnly === 'true') {
      alerts = alerts.filter(a => !a.read);
    }
    return alerts;
  }

  async updateAlertReadStatus(id, readState = true) {
    const alert = mockStore.alerts.find(a => a.id === id);
    if (alert) {
      alert.read = readState;
      return alert;
    }
    return null;
  }

  async archiveAlert(id) {
    const alert = mockStore.alerts.find(a => a.id === id);
    if (alert) {
      alert.archived = true;
      return alert;
    }
    return null;
  }

  async getWeather() {
    return mockStore.weather;
  }

  async getProfile() {
    return mockStore.profile;
  }

  async getSettings() {
    return mockStore.settings;
  }
}

module.exports = new OceanRepository();
