class ClassDeclarationVisitor {
    constructor(metrics) {
        this.metrics = metrics;
    }

    visit(node) {
        if (node.type === 'ClassDeclaration') {
            this.metrics.classes += 1;
        }
    }
}

module.exports = ClassDeclarationVisitor;
