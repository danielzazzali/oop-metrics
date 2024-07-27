const {getAllJsFiles} = require('../../src/utils/utils');
const path = require('path');
const fs = require('fs');


describe('getAllJsFiles', () => {
    test('should return an array of .js files in the current directory and subdirectories', () => {
        const jsFiles = getAllJsFiles();

        expect(Array.isArray(jsFiles)).toBe(true);

        for (const file of jsFiles) {
            expect(file).toHaveProperty('filePath');
            expect(file).toHaveProperty('fileName');

            expect(fs.existsSync(file.filePath)).toBe(true);
            expect(path.extname(file.filePath)).toBe('.js');

            expect(path.basename(file.filePath)).toBe(file.fileName);
        }
    });
});