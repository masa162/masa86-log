#!/usr/bin/env node
/**
 * Generate _routes.json and rename worker.js to _worker.js for Cloudflare Pages
 * Cloudflare Pages requires _worker.js (with underscore prefix)
 */

const fs = require('fs');
const path = require('path');

// Generate _routes.json
const routesConfig = {
  version: 1,
  include: ["/*"],
  exclude: []
};

const routesPath = path.join(__dirname, '..', '.open-next', '_routes.json');
fs.writeFileSync(routesPath, JSON.stringify(routesConfig, null, 2));
console.log('✅ Generated _routes.json for Cloudflare Pages');

// Rename worker.js to _worker.js (required by Cloudflare Pages)
const workerSrc = path.join(__dirname, '..', '.open-next', 'worker.js');
const workerDest = path.join(__dirname, '..', '.open-next', '_worker.js');

if (fs.existsSync(workerSrc)) {
  fs.renameSync(workerSrc, workerDest);
  console.log('✅ Renamed worker.js to _worker.js for Cloudflare Pages');
} else {
  console.warn('⚠️  worker.js not found, skipping rename');
}
