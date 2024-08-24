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



    incrementImports(fileName, objectName, importedObjectNames) {
        if (!this.metrics[fileName]) {
            this.metrics[fileName] = [];
        }

        let importMetric = this.metrics[fileName].find(m => m.metric === 'importCount');

        if (importMetric) {
            importMetric.count += 1;
            if (!importMetric.importedObjects.some(obj => obj.objectName === objectName)) {
                importMetric.importedObjects.push({ objectName, importedObjectNames });
            }
        } else {
            this.metrics[fileName].push({
                metric: 'importCount',
                count: 1,
                importedObjects: [{ objectName, importedObjectNames }]
            });
        }
    }

    incrementMethodUsage(fileName, objectName, methodName) {
        if (!this.metrics[fileName]) {
            this.metrics[fileName] = [];
        }

        let methodUsageMetric = this.metrics[fileName].find(m => m.metric === 'methodUsage');

        if (methodUsageMetric) {
            const existingMethod = methodUsageMetric.methods.find(m => m.objectName === objectName && m.methodName === methodName);
            if (existingMethod) {
                existingMethod.count += 1;
            } else {
                methodUsageMetric.methods.push({ objectName, methodName, count: 1 });
            }
        } else {
            this.metrics[fileName].push({
                metric: 'methodUsage',
                methods: [{ objectName, methodName, count: 1 }]
            });
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