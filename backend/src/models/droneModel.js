/**
 * Mongoose Schema Placeholder for Drone Entity
 * Designed to mirror mockStore JSON schema for seamless MongoDB migration
 */

const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  model: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'CHARGING', 'MAINTENANCE', 'OFFLINE'], default: 'ACTIVE' },
  battery: { type: Number, required: true, min: 0, max: 100 },
  depth: { type: Number, required: true },
  maxDepth: { type: Number, required: true },
  speed: { type: Number, required: true },
  heading: { type: Number, required: true },
  signal: { type: Number, required: true },
  mission: { type: String, required: true },
  sector: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  cameraStatus: { type: String, default: 'ONLINE' },
  temperature: { type: Number },
  salinity: { type: Number },
  oxygenLevel: { type: Number },
  streamUrl: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.models.Drone || mongoose.model('Drone', droneSchema);
