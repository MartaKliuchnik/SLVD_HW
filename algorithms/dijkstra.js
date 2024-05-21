import PriorityQueue from '../data-structures/priorityQueue.js';

/**
 * Finds the shortest paths from a given start vertex to all other vertices in a graph using Dijkstra's algorithm (for weighted graphs).
 * @param {Graph} graph - The graph in which to find the shortest paths.
 * @param {GraphNode} start - The starting vertex for finding shortest paths.
 * @returns {Map<GraphNode, { distance: number, path: GraphNode[] }>} - This function returns a map containing the shortest distances and paths from the start vertex to all other vertices.
 */
function dijkstra(graph, start) {
	const distances = new Map();
	const predecessors = new Map();
	const priorityQueue = new PriorityQueue();

	// Initialize distances with Infinity for all nodes except the start vertex
	for (let vertex of graph.nodes.values()) {
		distances.set(vertex, Infinity);
	}
	distances.set(start, 0);

	priorityQueue.enqueue(start, 0);

	// Main loop of Dijkstra's algorithm
	while (!priorityQueue.isEmpty()) {
		const currentVertex = priorityQueue.dequeue().element;

		// Update distances and predecessors for outgoing edges
		for (let [neighbor, weight] of currentVertex.getAdjacents()) {
			const totalDistance = distances.get(currentVertex) + weight;

			if (totalDistance < distances.get(neighbor)) {
				distances.set(neighbor, totalDistance);
				predecessors.set(neighbor, currentVertex);
				priorityQueue.enqueue(neighbor, totalDistance);
			}
		}
	}

	// Construct the shortest path for each vertex
	const shortestPaths = new Map();
	for (let [vertex, distance] of distances) {
		const path = [];
		let current = vertex;
		while (current !== start) {
			path.unshift(current);
			current = predecessors.get(current);
		}
		path.unshift(start);
		shortestPaths.set(vertex, { distance, path });
	}

	return shortestPaths;
}

export default dijkstra;
