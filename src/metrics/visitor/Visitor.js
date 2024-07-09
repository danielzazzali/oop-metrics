class Visitor {
    constructor(action) {
        this.action = action;
    }

    visit(node, fileName) {
        this.visitNode(node, fileName);
    }

    visitNode(node, fileName) {
        this.action(node, fileName);

        for (let key in node) {
            if (node[key] && typeof node[key] === 'object') {
                this.visit(node[key], fileName);
            }
        }
    }
}

module.exports = Visitor;