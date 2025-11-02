#!/usr/bin/env node
/**
 * Generate _routes.json for Cloudflare Pages
 * This tells Cloudflare Pages to route all requests to the worker
 */

const fs = require('fs');
const path = require('path');

const routesConfig = {
  version: 1,
  include: ["/*"],
  exclude: []
};

const outputPath = path.join(__dirname, '..', '.open-next', '_routes.json');

fs.writeFileSync(outputPath, JSON.stringify(routesConfig, null, 2));

console.log('✅ Generated _routes.json for Cloudflare Pages');
