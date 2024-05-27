const esprima = require('esprima');
const Visitor = require('./visitor');

const countLinesOfCode = (fileContent, node) => {
    const { start, end } = node.loc;
    const lines = fileContent.split('\n').slice(start.line - 1, end.line);
    const codeLines = lines.filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine.length > 0 && !trimmedLine.startsWith('//') && !trimmedLine.startsWith('/*') && !trimmedLine.endsWith('*/');
    });
    return codeLines.length;
};

const analyzeFile = (fileContent) => {
    const visitor = new Visitor();
    const ast = esprima.parseScript(fileContent, { loc: true });

    visitor.metrics.linesOfCode = countLinesOfCode(fileContent, ast);

    return visitor.analyze(ast);
};

module.exports = {
    analyzeFile
};