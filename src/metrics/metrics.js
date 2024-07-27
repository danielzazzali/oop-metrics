const estraverse = require('estraverse');
const MetricsStore = require('./store/MetricsStore');
const {isCallExpression} = require("./predicates/predicates");
const {getFunctionName} = require("../utils/utils");

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

module.exports = {
    countConsoleLog,
    calculateProcedureFanOut
};