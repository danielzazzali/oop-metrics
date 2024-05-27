const fs = require('fs');
const path = require('path');

const getAllJsFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath).filter(file => !path.join(dirPath, file).includes('node_modules'));
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
            arrayOfFiles = getAllJsFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.js')) {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
};

module.exports = {
    getAllJsFiles
};