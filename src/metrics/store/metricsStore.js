class MetricsStore {
    constructor() {
        if (!MetricsStore.instance) {
            this.metrics = {};
            MetricsStore.instance = this;
        }

        return MetricsStore.instance;
    }

    increment(metric, object, quantity = 1) {
        if (!this.metrics[object]) {
            this.metrics[object] = {};
        }

        if (!this.metrics[object][metric]) {
            this.metrics[object][metric] = 0;
        }

        this.metrics[object][metric] += quantity;
    }

    getMetrics() {
        return this.metrics;
    }

    clear() {
        for (let prop in this.metrics) {
            if (this.metrics.hasOwnProperty(prop)) {
                delete this.metrics[prop];
            }
        }
    }
}

const instance = new MetricsStore();
Object.freeze(instance);

module.exports = instance;