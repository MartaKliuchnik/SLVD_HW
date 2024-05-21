import Queue from '../data-structures/queue.js';

/**
 * Finds the shortest path between two vertices in a graph using Breadth-First Search (BFS).
 * @param {Map<any, GraphNode>} nodes - The map of nodes in the graph.
 * @param {any} start - The value of the start vertex.
 * @param {any} end - The value of the end vertex.
 * @returns {GraphNode[]} - This function returns an array representing the shortest path from the start vertex to the end vertex.
 */
export function bfsShortestPath(nodes, start, end) {
	const startNode = nodes.get(start);

	// If the starting node does not exist or the end node does not exist, return an empty path
	if (!startNode || !nodes.has(end)) return [];

	const visited = new Set();
	const queue = new Queue();
	const path = new Map(); // Map to store the predecessor of each node in the shortest path

	queue.enqueue(startNode);
	visited.add(startNode);

	while (!queue.isEmpty()) {
		const node = queue.dequeue();

		// If the current node is the destination, construct and return the shortest path
		if (node.value === end) {
			const shortestPath = [end];
			let current = end;
			while (current !== start) {
				current = path.get(current);
				shortestPath.unshift(current);
			}
			return shortestPath;
		}

		// Iterate over all adjacent nodes
		for (let [adjNode, _] of node.getAdjacents()) {
			if (!visited.has(adjNode)) {
				queue.enqueue(adjNode);
				visited.add(adjNode);
				path.set(adjNode.value, node.value); // Set the predecessor of the adjacent node
			}
		}
	}

	// If no path is found, return an empty array
	return [];
}
