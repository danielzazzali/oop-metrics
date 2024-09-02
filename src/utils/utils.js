const fs = require('fs');
const path = require('path');
const { inspect } = require('node:util');


function printLine() {
    console.log('-'.repeat(80));
}

function prettyPrint(object) {
    printLine();
    console.log(inspect(object, { depth: null, colors: true }));
    printLine();
}

function getRootPath() {
    return process.cwd();
}

function getIgnoreFiles(rootPath) {
    const ignorePath = path.join(rootPath, '.metricsignore');
    let ignoreFiles = [];
    if (fs.existsSync(ignorePath)) {
        ignoreFiles = fs.readFileSync(ignorePath, 'utf8').split('\n').map(line => path.join(rootPath, line));
    }
    return ignoreFiles;
}

function readDirectory(directory, ignoreFiles, arrayOfFiles) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const absolute = path.join(directory, file);

        if (ignoreFiles.includes(absolute)) {
            continue;
        }

        if (fs.statSync(absolute).isDirectory()) {
            readDirectory(absolute, ignoreFiles, arrayOfFiles);
        } else if (path.extname(absolute) === '.js') {
            arrayOfFiles.push({
                filePath: absolute,
                fileName: path.basename(absolute)
            });
        }
    }
}

function getAllJsFiles(customRootPath) {
    let arrayOfFiles = [];

    if (customRootPath) {
        const ignoreFiles = getIgnoreFiles(customRootPath);
        readDirectory(customRootPath, ignoreFiles, arrayOfFiles);
        return arrayOfFiles;
    }

    const rootPath = getRootPath();
    const ignoreFiles = getIgnoreFiles(rootPath);
    readDirectory(rootPath, ignoreFiles, arrayOfFiles);

    return arrayOfFiles;
}

function getFunctionName(node) {
    if (node.type === 'FunctionDeclaration' && node.id) {
        return node.id.name;
    }
    if (node.type === 'FunctionExpression' && node.id) {
        return node.id.name;
    }
    if (node.type === 'MethodDefinition' && node.key) {
        return node.key.name;
    }
    return null;
}

module.exports = {
    getAllJsFiles,
    prettyPrint,
    getRootPath,
    getFunctionName
};