/**
 * OceanEye Backend Server Entry Point
 */

require('dotenv').config();
const http = require('http');
const app = require('./src/app');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

function startServer(port) {
  const server = http.createServer(app);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[OceanEye Server] Port ${port} is currently in use.`);
      if (port < DEFAULT_PORT + 5) {
        console.log(`[OceanEye Server] Retrying startup on fallback port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(`[OceanEye Server] Unable to find an available port in range ${DEFAULT_PORT}-${port}.`);
        process.exit(1);
      }
    } else {
      console.error('[OceanEye Server] Server error:', err);
      process.exit(1);
    }
  });

  server.listen(port, () => {
    console.log(`=======================================================`);
    console.log(` OceanEye Marine Intelligence REST API Backend`);
    console.log(` Server running on http://localhost:${port}`);
    console.log(` Health check: http://localhost:${port}/api/v1/health`);
    console.log(`=======================================================`);
  });
}

startServer(DEFAULT_PORT);
