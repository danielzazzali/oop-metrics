const MetricsStore = require('./store/MetricsStore');


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

module.exports = {
    countConsoleLog
};