#!/usr/bin/env node

const fs = require('fs');
const esprima = require('esprima');
const dependencyTree = require('dependency-tree');
const Visitor = require('./metrics/visitor/Visitor');
const MetricsStore = require('./metrics/store/MetricsStore');
const { getAllJsFiles, prettyPrint, getRootPath } = require('./utils/utils');
const { countConsoleLog, calculateProcedureFanOut, countImports, countMethodUsage} = require('./metrics/metrics');
const { isConsoleLog, isProcedureNode, isVariableDeclarator, isMethodCall} = require('./metrics/predicates/predicates');

const files = getAllJsFiles();
const abstractSyntaxTrees = [];
const dependencyTrees = [];

files.forEach(file => {
    let code = fs.readFileSync(file.filePath, 'utf8');

    if (code.startsWith('#!')) {
        code = code.split('\n').slice(1).join('\n');
    }

    const ast = esprima.parseScript(code);
    abstractSyntaxTrees.push({
        fileName: file.fileName,
        ast: ast
    });

    const tree = dependencyTree.toList({
        filename: file.filePath,
        directory: getRootPath(),
        filter: path => path.indexOf('node_modules') === -1,
    });
    dependencyTrees.push({
        fileName: file.fileName,
        tree: tree
    });
});

const consoleLogVisitor = new Visitor(countConsoleLog, isConsoleLog);
const procedureFanOutVisitor = new Visitor(calculateProcedureFanOut, isProcedureNode);
const importVisitor = new Visitor(countImports, isVariableDeclarator);
const methodUsageVisitor = new Visitor(countMethodUsage, isMethodCall);

abstractSyntaxTrees.forEach(astObject => {
    // consoleLogVisitor.visit(astObject.ast, astObject.fileName);
    // procedureFanOutVisitor.visit(astObject.ast, astObject.fileName);
    importVisitor.visit(astObject.ast, astObject.fileName);
    methodUsageVisitor.visit(astObject.ast, astObject.fileName);
});

prettyPrint(MetricsStore.getMetrics());

