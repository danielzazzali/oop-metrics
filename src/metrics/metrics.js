const MetricsStore = require('./store/MetricsStore');
const { prettyPrint } = require('../utils/utils');

function countConsoleLog(node, fileName) {
    if (node.type === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.name === 'console' &&
        node.callee.property.name === 'log') {
        MetricsStore.increment('consoleLogCount', fileName);
        MetricsStore.increment('consoleLogCount', 'global');
    }
}

module.exports = {
    countConsoleLog
};