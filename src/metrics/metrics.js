const MetricsStore = require('./store/MetricsStore');


function countConsoleLog(node, fileName, predicate) {
    if (predicate(node)) {
        const objectName = node.callee.object ? node.callee.object.name : 'global';
        const methodName = node.callee.property ? node.callee.property.name : 'global';

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