class VariableDeclarationVisitor {
    constructor(metrics) {
        this.metrics = metrics;
    }

    visit(node) {
        if (node.type === 'VariableDeclaration') {
            this.metrics.variables = (this.metrics.variables || 0) + 1;
        }
    }
}

module.exports = VariableDeclarationVisitor;
