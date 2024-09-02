const estraverse = require('estraverse');
const MetricsStore = require('./store/MetricsStore');
const {isCallExpression} = require("./predicates/predicates");
const {getFunctionName} = require("../utils/utils");
const FanStore = require("./store/FanStore");

function countConsoleLog(node, fileName, predicate) {
    if (predicate(node)) {
        const objectName = node.callee.object.name
        const methodName = node.callee.property.name

        MetricsStore.increment(fileName, {
            metric: 'consoleLogCount',
            objectName,
            methodName
        });
    }
}

function calculateProcedureFanOut(node, fileName, predicate) {
    if (predicate(node)) {
        const functionName = getFunctionName(node) || 'anonymous';
        const metricData = {
            metric: 'ProcedureFanOut',
            methodName: functionName
        };

        estraverse.traverse(node, {
            enter: (innerNode) => {
                if (isCallExpression(innerNode)) {
                    MetricsStore.increment(fileName, metricData);
                }
            },
            skipProperty: 'body'
        });
    }
}

function countImports(node, fileName, predicate) {
    if (predicate(node)) {
        const init = node.init;
        const id = node.id;
        if (init && init.type === 'CallExpression' && init.callee.name === 'require') {
            const objectName = init.arguments[0].value;

            if (!objectName.startsWith('./') && !objectName.startsWith('../')) {
                return;
            }

            let importedObjectNames = [];

            if (id.type === 'Identifier') {
                importedObjectNames.push(id.name);
            } else if (id.type === 'ObjectPattern') {
                importedObjectNames = id.properties.map(prop => prop.key.name);
            }

            MetricsStore.incrementImports(fileName, objectName, importedObjectNames);
            FanStore.incrementFanOut(fileName, objectName, importedObjectNames);
            FanStore.incrementFanIn(objectName, fileName);
        }
    }
}

function countMethodUsage(node, fileName, predicate) {
    if (predicate(node)) {
        const objectName = node.callee.object.name;
        const methodName = node.callee.property.name;

        const fileMetrics = MetricsStore.getMetrics()[fileName];
        const importMetric = fileMetrics && fileMetrics.find(m => m.metric === 'importCount');
        const importedObjects = importMetric ? importMetric.importedObjects.map(obj => obj.objectName) : [];

        if (importedObjects.includes(objectName)) {
            MetricsStore.incrementMethodUsage(fileName, objectName, methodName);
        }
    }
}

module.exports = {
    countConsoleLog,
    calculateProcedureFanOut,
    countImports,
    countMethodUsage
};