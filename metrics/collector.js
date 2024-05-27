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
        const directoryPathParts = path.dirname(relativePath).split(path.sep);

        let currentDirectory = result;
        for (const part of directoryPathParts) {
            if (!currentDirectory[part]) {
                currentDirectory[part] = {};
            }
            currentDirectory = currentDirectory[part];
        }

        currentDirectory[path.basename(filePath)] = analyzeFile(fileContent);
    });

    const sumMetrics = (obj) => {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (key.endsWith('.js')) {
                for (const metric in value) {
                    acc[metric] = (acc[metric] || 0) + value[metric];
                }
            } else if (typeof value === 'object') {
                const nestedMetrics = sumMetrics(value);
                for (const metric in nestedMetrics) {
                    acc[metric] = (acc[metric] || 0) + nestedMetrics[metric];
                }
            }
            return acc;
        }, {});
    };

    result['Project total metrics'] = sumMetrics(result);

    return result;
};

module.exports = {
    collectMetrics
};