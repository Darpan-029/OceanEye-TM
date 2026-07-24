/**
 * Standard API Response Envelope Helper
 */

const formatSuccess = (data = {}, message = "Success", statusCode = 200) => {
  return {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    data
  };
};

const formatError = (message = "An error occurred", statusCode = 500, errorDetails = null) => {
  return {
    success: false,
    message,
    timestamp: new Date().toISOString(),
    error: {
      code: statusCode,
      details: errorDetails
    }
  };
};

module.exports = {
  formatSuccess,
  formatError
};
