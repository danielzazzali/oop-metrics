const estraverse = require('estraverse');

class Visitor {
    constructor(action, predicate) {
        this.action = action;
        this.predicate = predicate;
    }

    visit(node, fileName) {
        estraverse.traverse(node, {
            enter: (node) => {
                this.action(node, fileName, this.predicate);
            }
        });
    }
}

module.exports = Visitor;