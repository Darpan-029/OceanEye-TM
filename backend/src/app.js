/**
 * OceanEye Express Application Initializer
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes/apiRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security & Utility Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Optional artificial latency in dev mode to simulate real network conditions
app.use((req, res, next) => {
  if (process.env.SIMULATE_LATENCY === 'true') {
    const delay = Math.floor(Math.random() * 200) + 150; // 150-350ms delay
    setTimeout(next, delay);
  } else {
    next();
  }
});

// API Routes Mounted at /api/v1
app.use('/api/v1', apiRoutes);

// Root fallback handler
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>OceanEye API Engine</title></head>
      <body style="font-family: sans-serif; background: #031826; color: #47B5FF; padding: 40px;">
        <h1>OceanEye REST API Engine v1.0.0</h1>
        <p>Status: <strong>ONLINE & OPERATIONAL</strong></p>
        <p>API Endpoint: <a href="/api/v1/health" style="color: #7FD4D4;">/api/v1/health</a></p>
        <p>Dashboard API: <a href="/api/v1/dashboard" style="color: #7FD4D4;">/api/v1/dashboard</a></p>
      </body>
    </html>
  `);
});

// Global 404 Route Handler
app.use((req, res, next) => {
  const err = new Error(`Resource not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
