const metricsStore = require('../../../src/metrics/store/MetricsStore');


describe('MetricsStore', () => {
    beforeEach(() => {
        metricsStore.clear();
    });

    test('increment creates a new metric array if it does not exist', () => {
        metricsStore.increment('file1', { metric: 'fanIn' });
        expect(metricsStore.getMetrics()).toEqual({
            file1: [
                { metric: 'fanIn', objectName: 'global', methodName: 'global', count: 1 }
            ]
        });
    });

    test('increment adds to an existing metric count', () => {
        metricsStore.increment('file1', { metric: 'fanIn' });
        metricsStore.increment('file1', { metric: 'fanIn' });
        expect(metricsStore.getMetrics()).toEqual({
            file1: [
                { metric: 'fanIn', objectName: 'global', methodName: 'global', count: 2 }
            ]
        });
    });

    test('increment adds a new metric to an existing file', () => {
        metricsStore.increment('file1', { metric: 'fanIn' });
        metricsStore.increment('file1', { metric: 'fanOut' });
        expect(metricsStore.getMetrics()).toEqual({
            file1: [
                { metric: 'fanIn', objectName: 'global', methodName: 'global', count: 1 },
                { metric: 'fanOut', objectName: 'global', methodName: 'global', count: 1 }
            ]
        });
    });

    test('clear removes all metrics', () => {
        metricsStore.increment('file1', { metric: 'fanIn' });
        expect(metricsStore.getMetrics()).toEqual({
            file1: [
                { metric: 'fanIn', objectName: 'global', methodName: 'global', count: 1 }
            ]
        });

        metricsStore.clear();
        expect(metricsStore.getMetrics()).toEqual({});
    });
});