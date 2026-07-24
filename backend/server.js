/**
 * OceanEye Backend Server Entry Point
 */

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` OceanEye Marine Intelligence REST API Backend`);
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/v1/health`);
  console.log(`=======================================================`);
});
