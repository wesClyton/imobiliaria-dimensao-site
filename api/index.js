'use strict';
const path = require('path');

// Resolve o caminho do browser a partir da localização real deste arquivo
process.env.BROWSER_DIST_PATH = path.join(__dirname, '../dist/imobiliaria-dimensao-site/browser');

module.exports = require('../dist/imobiliaria-dimensao-site/server/main').default;
