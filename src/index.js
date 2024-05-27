#!/usr/bin/env node

const { collectMetrics } = require('./metrics/collector');

const dirPath = process.cwd();
const [ metricsReport, projectMetricsReport ] = collectMetrics(dirPath);

printLine();
console.log(JSON.stringify(metricsReport, null, 2));
printLine();
console.log(JSON.stringify(projectMetricsReport, null, 2));
printLine();

function printLine() {
    console.log('-'.repeat(80));
}