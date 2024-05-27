const fs = require('fs');
const path = require('path');
const { getAllJsFiles } = require('../utils/fileUtils');
const { analyzeFile } = require('./analyzer');

const collectMetrics = (dirPath) => {
    const result = {};
    const jsFiles = getAllJsFiles(dirPath);

    jsFiles.forEach(filePath => {
        const relativePath = path.relative(dirPath, filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const directoryPath = path.dirname(relativePath);
        if (!result[directoryPath]) {
            result[directoryPath] = {};
        }
        result[directoryPath][path.basename(filePath)] = analyzeFile(fileContent);
    });

    result['Project total metrics'] = Object.values(result).flatMap(Object.values).reduce((acc, metrics) => {
        for (const key in metrics) {
            acc[key] = (acc[key] || 0) + metrics[key];
        }
        return acc;
    }, {});

    return result;
};

module.exports = {
    collectMetrics
};