import GraphNode from '../utils/graphNode.js';
import Queue from './queue.js';
import Stack from './stack.js';

/**
 * Represents a Graph (Adjacency List).
 * Provides methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).
 */
class Graph {
	/**
	 * Initialize the nodes map
	 * @param {Symbol} edgeDirection either `Graph.DIRECTED` or `Graph.UNDIRECTED`
	 */
	constructor(edgeDirection = Graph.DIRECTED) {
		this.nodes = new Map();
		this.edgeDirection = edgeDirection;
	}

	/**
	 * Create a connection between the source node and the destination node.
	 * @param {any} source - The source node.
	 * @param {any} destination - The destination node.
	 * @param {any} weight - The weight node.
	 * @returns {[Node, Node]} - This method returns source/destination node pair
	 */
	addEdge(source, destination, weight = 0) {
		const sourceNode = this.addVertex(source);
		const destinationNode = this.addVertex(destination);

		sourceNode.addAdjacent(destinationNode, weight);
		if (this.edgeDirection === Graph.UNDIRECTED) {
			destinationNode.addAdjacent(sourceNode, weight);
		}

		return [sourceNode, destinationNode];
	}

	/**
	 * Add a node to the graph.
	 * @param {any} value - The node's value.
	 * @returns {Node} - This method returns the new node or the existing one if it already exits.
	 */
	addVertex(value) {
		if (this.nodes.has(value)) {
			return this.nodes.get(value);
		} else {
			const vertex = new GraphNode(value);
			this.nodes.set(value, vertex);
			return vertex;
		}
	}

	/**
	 * Depth First Search (from an initial vertex, the first adjacent node of each vertex found)
	 * @param {any} start - The starting node's value.
	 * @returns {Set<any>} - This method returns a set of visited nodes.
	 */
	dfs(start) {
		const startNode = this.nodes.get(start.value); // Get the starting node from the graph
		// If the starting node does not exist, return the empty set of visited nodes
		if (!startNode) return new Set();

		const visited = new Set();
		// DFS explores as far as possible along each branch before backtracking.
		// This behavior is naturally supported by a stack data structure, with (LIFO) principle.
		const visitList = new Stack(); // Initialize a Stack instance

		visitList.push(startNode);

		// Continue the DFS Loop while there are nodes in the stack
		while (!visitList.isEmpty()) {
			const node = visitList.pop();

			// If the node has not been visited yet
			if (!visited.has(node.value)) {
				visited.add(node.value); // Mark the node as visited by adding it to the visited set

				// Iterate over all adjacent nodes
				for (let [adjNode, _] of node.getAdjacents()) {
					if (!visited.has(adjNode.value)) {
						visitList.push(adjNode);
					}
				}
			}
		}
		return visited;
	}

	/**
	 * Breadth First Search (involves visiting all the connected nodes of a graph in a level-by-level manner)
	 * @param {any} start - The starting node's value.
	 * @returns {Set<any>} - This method returns a set of visited nodes.
	 */
	bfs(start) {
		const startNode = this.nodes.get(start.value);

		const visited = new Set();
		// BFS explores all neighbors at the present depth prior to moving on to nodes at the next depth level.
		// This behavior is naturally supported by a queue data structure, with (FIFO) principle.
		const queue = new Queue();

		// If the starting node does not exist, return the empty set of visited nodes
		if (!startNode) return visited;

		queue.enqueue(startNode);

		// Continue the BFS Loop while there are nodes in the stack
		while (!queue.isEmpty()) {
			const node = queue.dequeue();
			// If the node has not been visited yet
			if (!visited.has(node.value)) {
				visited.add(node.value);

				// Iterate over all adjacent nodes
				for (let [adjNode, _] of node.getAdjacents()) {
					if (!visited.has(adjNode.value)) {
						queue.enqueue(adjNode);
					}
				}
			}
		}
		return visited;
	}

	/**
	 * Get the weight of the edge between two vertices in the graph.
	 * @param {any} source - The value of the source vertex.
	 * @param {any} destination - The value of the destination vertex.
	 * @returns {number} - This method returns the weight of the edge between the source and destination vertices, or returns Infinity (if no edge exists).
	 */
	getWeight(source, destination) {
		const sourceNode = this.nodes.get(source);
		const destinationNode = this.nodes.get(destination);

		// If the source and destination nodes exist
		if (sourceNode && destinationNode) {
			return sourceNode.adjacents.get(destinationNode);
		}
		// If no edge exists
		return Infinity;
	}
}

Graph.UNDIRECTED = Symbol('undirected graph'); // two-ways edges
Graph.DIRECTED = Symbol('directed graph'); // one-way edges

export default Graph;
