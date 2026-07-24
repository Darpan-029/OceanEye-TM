/**
 * Global Error Handler Middleware
 */

const { formatError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(`[API ERROR] ${req.method} ${req.originalUrl}:`, err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json(formatError(message, statusCode, err.stack));
};

module.exports = errorHandler;
