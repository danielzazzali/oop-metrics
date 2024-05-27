const fs = require('fs');
const path = require('path');
const { getAllJsFiles } = require('../utils/fileUtils');
const { analyzeFile } = require('./analyzer');

const collectMetrics = (dirPath) => {
    const result = {};

    const processDirectory = (currentDirPath) => {
        const files = fs.readdirSync(currentDirPath);

        files.forEach(file => {
            const filePath = path.join(currentDirPath, file);
            const relativePath = path.relative(dirPath, filePath);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                processDirectory(filePath);
                return;
            }

            if (path.extname(file) === '.js') {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                result[relativePath] = {file: relativePath, metrics: analyzeFile(fileContent)};
            }
        });
    };

    processDirectory(dirPath);

    result['Project total metrics'] = Object.values(result).reduce((acc, {metrics}) => {
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
