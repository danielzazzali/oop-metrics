#!/usr/bin/env node

const fs = require('fs');
const Visitor = require('./metrics/visitor/Visitor');
const esprima = require('esprima');
const MetricsStore = require('./metrics/store/MetricsStore');
const { getAllJsFiles, prettyPrint } = require('./utils/utils');
const { countConsoleLog } = require('./metrics/metrics');
const { isConsoleLog } = require('./metrics/predicates/predicates');

const files = getAllJsFiles();
const asts = [];

files.forEach(file => {
    let code = fs.readFileSync(file.filePath, 'utf8');

    if (code.startsWith('#!')) {
        code = code.split('\n').slice(1).join('\n');
    }

    const ast = esprima.parseScript(code);
    asts.push({
        ast: ast,
        fileName: file.fileName
    });
});

const countConsoleLogVisitor = new Visitor(countConsoleLog, isConsoleLog);

asts.forEach(astObject => {
    countConsoleLogVisitor.visit(astObject.ast, astObject.fileName);
});

prettyPrint(MetricsStore.getMetrics());

