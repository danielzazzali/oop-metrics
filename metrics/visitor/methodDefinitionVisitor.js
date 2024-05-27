class MethodDefinitionVisitor {
    constructor(metrics) {
        this.metrics = metrics;
    }

    visit(node) {
        if (node.type === 'MethodDefinition') {
            this.metrics.methods += 1;
        }
    }
}

module.exports = MethodDefinitionVisitor;
