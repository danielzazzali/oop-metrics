const metricsStore = require('../../../src/metrics/store/metricsStore');

describe('MetricsStore', () => {
    beforeEach(() => {
        metricsStore.clear();
    })

    test('increment creates a new object and metric if they do not exist', () => {
        metricsStore.increment('fanIn', 'file1');
        expect(metricsStore.getMetrics()).toEqual({
            file1: {
                fanIn: 1
            }
        });
    });

    test('increment adds to an existing metric', () => {
        metricsStore.increment('fanIn', 'file1');
        metricsStore.increment('fanIn', 'file1');
        expect(metricsStore.getMetrics()).toEqual({
            file1: {
                fanIn: 2
            }
        });
    });

    test('increment adds a new metric to an existing object', () => {
        metricsStore.increment('fanIn', 'file1');
        metricsStore.increment('fanOut', 'file1');
        expect(metricsStore.getMetrics()).toEqual({
            file1: {
                fanIn: 1,
                fanOut: 1
            }
        });
    });

    test('clear removes all metrics', () => {
        metricsStore.increment('fanIn', 'file1');
        expect(metricsStore.getMetrics()).toEqual({
            file1: {
                fanIn: 1
            }
        });

        metricsStore.clear();
        expect(metricsStore.getMetrics()).toEqual({});
    });
});