class AliasManager {
    constructor() {
        this.aliases = {};
    }

    addAlias(aliasName, originalName) {
        this.aliases[aliasName] = originalName;
    }

    isAlias(aliasName, originalName) {
        return this.aliases[aliasName] === originalName;
    }

    clear() {
        this.aliases = {};
    }
}

const aliasManager = new AliasManager();
Object.freeze(aliasManager);

module.exports = aliasManager;
