const ClassDeclarationVisitor = require('./classDeclarationVisitor');
const MethodDefinitionVisitor = require('./methodDefinitionVisitor');
const VariableDeclarationVisitor = require('./variableDeclarationVisitor');
const FunctionDeclarationVisitor = require('./functionDeclarationVisitor');

class Visitor {
    constructor() {
        this.metrics = {
            classes: 0,
            methods: 0,
            variables: 0,
            functions: 0,
            linesOfCode: 0,
        };
        this.visitors = [
            new ClassDeclarationVisitor(this.metrics),
            new MethodDefinitionVisitor(this.metrics),
            new VariableDeclarationVisitor(this.metrics),
            new FunctionDeclarationVisitor(this.metrics)
        ];
    }

    visit(node) {
        for (const visitor of this.visitors) {
            visitor.visit(node);
        }

        for (let key in node) {
            if (node[key] && typeof node[key] === 'object') {
                this.visit(node[key]);
            }
        }
    }

    analyze(ast) {
        this.visit(ast);
        return this.metrics;
    }
}

module.exports = Visitor;
