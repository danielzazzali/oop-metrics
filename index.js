#!/usr/bin/env node

const { collectMetrics } = require('./metrics/collector');

const dirPath = process.cwd();
const metricsReport = collectMetrics(dirPath);

console.log(JSON.stringify(metricsReport, null, 2));
