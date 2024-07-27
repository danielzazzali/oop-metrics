const metricsStore = require('../../../src/metrics/store/MetricsStore');

// TODO: Write a test suite for the MetricsStore class
describe('MetricsStore', () => {
    beforeEach(() => {
        metricsStore.clear();
    });

    test('increment creates a new metric array if it does not exist', () => {});

    test('increment adds to an existing metric count', () => {});

    test('increment adds a new metric to an existing file', () => {});

    test('clear removes all metrics', () => {});
});