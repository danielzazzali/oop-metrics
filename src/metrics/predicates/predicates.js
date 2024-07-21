const { generatePredicate } = require('./predicateGenerator');


const isConsoleLog = generatePredicate({
    'type': 'CallExpression',
    'callee.type': 'MemberExpression',
    'callee.object.name': 'console',
    'callee.property.name': 'log'
});

const isMyClassDeclaration = generatePredicate({
    'type': 'ClassDeclaration',
    'id.name': 'MyClass'
});

module.exports = {
    isConsoleLog,
    isMyClassDeclaration
};