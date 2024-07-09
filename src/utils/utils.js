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

const getRootPath = () => {
    return process.cwd();
};

const getIgnoreFiles = (rootPath) => {
    const ignorePath = path.join(rootPath, '.metricsignore');
    let ignoreFiles = [];
    if (fs.existsSync(ignorePath)) {
        ignoreFiles = fs.readFileSync(ignorePath, 'utf8').split('\n').map(line => path.join(rootPath, line));
    }
    return ignoreFiles;
};

const readDirectory = (directory, ignoreFiles, arrayOfFiles) => {
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
};

const getAllJsFiles = () => {
    let arrayOfFiles = [];
    const rootPath = getRootPath();
    const ignoreFiles = getIgnoreFiles(rootPath);

    readDirectory(rootPath, ignoreFiles, arrayOfFiles);

    return arrayOfFiles;
};

module.exports = {
    getAllJsFiles,
    prettyPrint,
};