const { generatePredicate } = require('./predicateGenerator');


const isConsoleLog = generatePredicate({
    'type': 'CallExpression',
    'callee.type': 'MemberExpression',
    'callee.object.name': 'console',
    'callee.property.name': 'log'
});

const isProcedureNode = generatePredicate({
    'type': ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'MethodDefinition']
});

const isCallExpression = generatePredicate({
    'type': 'CallExpression'
});

module.exports = {
    isConsoleLog,
    isProcedureNode,
    isCallExpression
};