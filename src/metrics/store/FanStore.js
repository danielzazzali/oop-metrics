class FanStore {
    constructor() {
        this.fanOutMetrics = {};
        this.fanInMetrics = {};
    }

    incrementFanOut(fileName, calleeName, functionNames) {
        if (!this.fanOutMetrics[fileName]) {
            this.fanOutMetrics[fileName] = {};
        }
        if (!this.fanOutMetrics[fileName][calleeName]) {
            this.fanOutMetrics[fileName][calleeName] = new Set();
        }
        functionNames.forEach(fn => this.fanOutMetrics[fileName][calleeName].add(fn));
    }

    incrementFanIn(calleeName, fileName) {
        if (!this.fanInMetrics[calleeName]) {
            this.fanInMetrics[calleeName] = new Set();
        }
        this.fanInMetrics[calleeName].add(fileName);
    }

    getFanOutMetrics() {
        const result = {};
        for (const file in this.fanOutMetrics) {
            result[file] = {};
            for (const callee in this.fanOutMetrics[file]) {
                result[file][callee] = Array.from(this.fanOutMetrics[file][callee]);
            }
        }
        return result;
    }

    getFanInMetrics() {
        const result = {};
        for (const callee in this.fanInMetrics) {
            result[callee] = Array.from(this.fanInMetrics[callee]);
        }
        return result;
    }
}

const instance = new FanStore();
Object.freeze(instance);

module.exports = instance;