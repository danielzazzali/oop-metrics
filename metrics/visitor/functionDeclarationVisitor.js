class FunctionDeclarationVisitor {
    constructor(metrics) {
        this.metrics = metrics;
    }

    visit(node) {
        if (node.type === 'FunctionDeclaration') {
            this.metrics.functions = (this.metrics.functions || 0) + 1;
        }
    }
}

module.exports = FunctionDeclarationVisitor;
