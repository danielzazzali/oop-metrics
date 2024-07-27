class MetricsStore {
    constructor() {
        if (!MetricsStore.instance) {
            this.metrics = {};
            MetricsStore.instance = this;
        }

        return MetricsStore.instance;
    }

    increment(fileName, metricData) {
        const { metric, objectName, methodName, quantity = 1 } = metricData;

        if (!this.metrics[fileName]) {
            this.metrics[fileName] = [];
        }

        const existingMetric = this.metrics[fileName].find(m =>
            m.objectName === objectName && m.methodName === methodName && m.metric === metric
        );

        if (existingMetric) {
            existingMetric.count += quantity;
        } else {
            const newMetric = { metric, count: quantity };
            if (objectName) newMetric.objectName = objectName;
            if (methodName) newMetric.methodName = methodName;
            this.metrics[fileName].push(newMetric);
        }
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