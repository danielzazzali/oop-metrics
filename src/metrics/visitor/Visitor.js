class Visitor {
    constructor(action, predicate) {
        this.action = action;
        this.predicate = predicate;
    }

    visit(node, fileName) {
        this._visitNode(node, fileName);
    }

    _visitNode(node, fileName) {
        this.action(node, fileName, this.predicate);

        for (let key in node) {
            if (node[key] && typeof node[key] === 'object') {
                this.visit(node[key], fileName);
            }
        }
    }
}

module.exports = Visitor;