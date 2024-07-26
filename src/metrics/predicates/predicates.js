const { generatePredicate } = require('./predicateGenerator');


const isConsoleLog = generatePredicate({
    'type': 'CallExpression',
    'callee.type': 'MemberExpression',
    'callee.object.name': 'console',
    'callee.property.name': 'log'
});


module.exports = {
    isConsoleLog,
};