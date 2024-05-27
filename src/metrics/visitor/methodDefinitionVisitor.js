class MethodDefinitionVisitor {
    constructor(metrics) {
        this.metrics = metrics;
    }

    visit(node) {
        if (node.type === 'MethodDefinition') {
            this.metrics.methods = (this.metrics.methods || 0) + 1;
        }
    }
}

module.exports = MethodDefinitionVisitor;
