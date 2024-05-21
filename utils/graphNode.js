import Node from './node.js';

/**
 * Represents the Node in a graph.
 * Extends the base Node class.
 * Contains vertex’s value and adjacent vertices.
 */
class GraphNode extends Node {
	/**
	 * Initialize a node
	 * @param {any} value - The value of the node.
	 */
	constructor(value) {
		super(value);
		this.adjacents = new Map();
	}

	/**
	 * Add an adjacent node
	 * @param {Node} node - The node to be added as adjacent.
	 * @param {number} weight -  The weight of the edge between the current node and the adjacent node.
	 * @returns {undefined} - This method does not return any value.
	 */
	addAdjacent(node, weight) {
		this.adjacents.set(node, weight);
	}

	/**
	 * Get all adjacent nodes
	 * @returns {Array<[GraphNode, number]>} - This method returns an array of tuples containing adjacent nodes and their associated weights.
	 */
	getAdjacents() {
		return Array.from(this.adjacents.entries());
	}
}

export default GraphNode;
