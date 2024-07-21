/**
 * Generates a predicate function based on provided criteria.
 * @param {Object} criteria - An object where keys represent paths in a node and values are the expected values at those paths.
 * @returns {Function} A predicate function that checks if a given node matches the criteria.
 */
function generatePredicate(criteria) {
    /**
     * The predicate function that checks if a node matches the criteria.
     * @param {Object} node - The node to be checked against the criteria.
     * @returns {boolean} True if the node matches all criteria, false otherwise.
     */
    return function(node) {
        // Check if every key-value pair in the criteria matches the node
        return Object.keys(criteria).every(key => {
            const path = key.split('.'); // Split the key into a path array
            let value = node;
            for (let i = 0; i < path.length; i++) {
                if (value === undefined) return false; // If any part of the path is undefined, the criteria is not met
                value = value[path[i]]; // Traverse the path in the node
            }
            return value === criteria[key]; // Compare the value in the node to the expected value in the criteria
        });
    };
}

module.exports = { generatePredicate };