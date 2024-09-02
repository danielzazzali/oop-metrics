const estraverse = require('estraverse');
const { getFunctionName } = require("../utils/utils");
const esprima = require('esprima');
const { isCallExpression } = require("./predicates/predicates");
const FanStore = require("./store/FanStore");

function calculateFanMetrics(node, fileName, predicate) {
    if (predicate(node)) {
        const init = node.init;
        const id = node.id;
        if (init && init.type === 'CallExpression' && init.callee.name === 'require') {
            const importedFile = init.arguments[0].value;
            let importedObjectNames = [];

            if (id.type === 'Identifier') {
                importedObjectNames.push(id.name);
            } else if (id.type === 'ObjectPattern') {
                importedObjectNames = id.properties.map(prop => prop.key.name);
            }

            FanStore.incrementFanOut(fileName, importedFile, importedObjectNames);
            FanStore.incrementFanIn(importedFile, fileName);
        }
    }
}

module.exports = { calculateFanMetrics };