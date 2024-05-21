import Stack from './data-structures/stack.js';
import Queue from './data-structures/queue.js';
import TreeNode from './utils/treeNode.js';
import MinMaxStack from './algorithms/minMaxStack.js';
import BinaryTree from './data-structures/binaryTree.js';
import BinarySearchTree from './data-structures/binarySearchTree.js';
import { isBinarySearchTree } from './utils/isBinarySearchTree.js';
import { bfsShortestPath } from './algorithms/bfsShortestPath.js';
import Graph from './data-structures/graph.js';
import dijkstra from './algorithms/dijkstra.js';
import LinkedList from './data-structures/linkedList.js';
import { makeloop } from './utils/makeLoopForLinkedList.js';
import { hasCycle } from './algorithms/linkedListCycle.js';

// Demonstration:
// Create an instance of the Stack class
const someStack = new Stack();

// Add elements onto the stack, following a specific order known as Last in, First out (LIFO)
someStack.push(2);
someStack.push(4);
someStack.push(6);

// Display current stack
console.log(someStack); // stack: (3) [2, 4, 6]

// See the top element of the stack without removing it
console.log(someStack.peek()); // 6

// Retrieve and remove the top element of the stack
console.log(someStack.pop()); // 6
console.log(someStack.pop()); // 4
console.log(someStack.pop()); // 2

console.log(someStack.pop()); // Underflow - stack is empty or Throws an Error: Underflow - stack is empty

// Display current stack
console.log(someStack); // stack: (0) []

// Create an instance of the MinMaxStack class
const someMinMaxStack = new MinMaxStack();

// Add elements onto the MinMaxStack, following a specific order known as Last in, First out (LIFO)
someMinMaxStack.push(2);
someMinMaxStack.push(6);
someMinMaxStack.push(4);

// Display current stack
console.log(someMinMaxStack); // stack: (3) [2, 4, 6]

// See the top element of the stack without removing it
console.log(someMinMaxStack.peek()); // 4

// Get the minimum and maximum elements
console.log(someMinMaxStack.getMin()); // 2
console.log(someMinMaxStack.getMax()); // 6

// Retrieve and remove the top element of the MinMaxStack
console.log(someMinMaxStack.pop()); // 4
console.log(someMinMaxStack.pop()); // 6

// Get the updated maximum element
console.log(someMinMaxStack.getMax()); // 2

// Add more elements onto the MinMaxStack
someMinMaxStack.push(40);
someMinMaxStack.push(0);

// Get the updated minimum and maximum elements
console.log(someMinMaxStack.getMin()); // 0
console.log(someMinMaxStack.getMax()); // 40

// Display current someMinMaxStack
console.log(someMinMaxStack); // maxStack: Stack {stack: [2, 40]}; minStack: Stack {stack: [2, 0]}; stack: [2, 40, 0]

// Create an instance of the Queue class
const someQueue = new Queue();

// Add elements onto the queue, following a specific order known as First in, First out (FIFO)
someQueue.enqueue(1);
someQueue.enqueue(2);
someQueue.enqueue(3);

// Display current queue
console.log(someQueue); // queue: (3) [1, 2, 3]

// See the front element of the queue without removing it
console.log(someQueue.peek()); // 1

// Retrieve and remove the front element of the queue
console.log(someQueue.dequeue()); // 1
console.log(someQueue.dequeue()); // 2
console.log(someQueue.dequeue()); // 3

console.log(someQueue.dequeue()); // Underflow - queue is empty or Throws an Error: Underflow - queue is empty

// Display current queue
console.log(someQueue); // Queue {queue: Array(0)}

/**
 * Implement a perfect binary tree (all the levels (including the last one) are full of nodes).
 * Create nodes with values:
 */
const htmlNode = new TreeNode('HTML'); // root
const headNode = new TreeNode('Head');
const bodyNode = new TreeNode('Body');
const titleNode = new TreeNode('Title');
const linkNode = new TreeNode('Link');
const divNode = new TreeNode('Div');
const scriptNode = new TreeNode('Script');

// Associate root with is descendants
const someBinaryTree = new BinaryTree();
someBinaryTree
	.insert(htmlNode) //root
	.insert(headNode) //root.leftChild
	.insert(bodyNode) //root.rightChild
	.insert(titleNode) //root.leftChild.leftChild
	.insert(linkNode) //root.leftChild.rightChild
	.insert(divNode) //root.rightChild.leftChild
	.insert(scriptNode); //root.rightChild.rightChild

// Display current binaty tree
console.log(someBinaryTree.root);

// Search for nodes
console.log(someBinaryTree.search('Div')); // TreeNode {value: 'Div'}
console.log(someBinaryTree.search('CSS')); // null

/**
 * Post-order traversal demonstration (left child – right child – root)
 * Display result in this order:
 * - Left child: Title, Link, Head
 * - Right child: Div, Script, Body
 * - root: HTML
 */
console.log('Postorder traversal:');
someBinaryTree.postorderTraversal(someBinaryTree.root, (value) =>
	console.log(value)
);

//  Demonstration for BinarySearchTree:
const someBinarySearchTree = new BinarySearchTree();
someBinarySearchTree
	.insert(10)
	.insert(15)
	.insert(5)
	.insert(7)
	.insert(3)
	.insert(17)
	.insert(12);

const someNotBinarySearchTree = new BinaryTree();
someNotBinarySearchTree
	.insert(10)
	.insert(15)
	.insert(5)
	.insert(7)
	.insert(3)
	.insert(17)
	.insert(12);

// Check if the tree rooted at 'root' is a valid BST
console.log(isBinarySearchTree(someNotBinarySearchTree.root)); // false
console.log(isBinarySearchTree(someBinarySearchTree.root)); // true

// Create a new Graph instance (unweighted)
const someUnweightedGraph = new Graph(Graph.UNDIRECTED);

// Create a connection between the source node and the destination node.
const [firstNode] = someUnweightedGraph.addEdge(1, 2);
someUnweightedGraph.addEdge(1, 3);
someUnweightedGraph.addEdge(1, 4);
someUnweightedGraph.addEdge(5, 2);
someUnweightedGraph.addEdge(6, 3);
someUnweightedGraph.addEdge(7, 3);
someUnweightedGraph.addEdge(8, 4);
someUnweightedGraph.addEdge(9, 5);
someUnweightedGraph.addEdge(10, 6);

// Demonstration for Depth First search
const dfsResult = someUnweightedGraph.dfs(firstNode);
const dfsValues = Array.from(dfsResult);
console.log('DFS Result:', dfsValues); // [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]

// Demonstration for Breadth First search
const bfsResult = someUnweightedGraph.bfs(firstNode);
const bfsValues = Array.from(bfsResult);
console.log('BFS Result:', bfsValues); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Use someUnweightedGraph Graph instance (unweighted)
// Define the start and end vertices for finding the shortest path
const startVertex = 1;
const endVertex = 6;

// Find the shortest path using BFS
const shortestPath = bfsShortestPath(
	someUnweightedGraph.nodes,
	startVertex,
	endVertex
);

// Demonstration shortest paths
console.log(
	'Shortest path from vertex',
	startVertex,
	'to vertex',
	endVertex,
	':',
	shortestPath
); // Shortest path from vertex 1 to vertex 6 : (3) [1, 3, 6]

// Create a new Graph instance (weighted)
const someWeightedGraph = new Graph(Graph.UNDIRECTED);

// Create a connection between the source node and the destination node.
someWeightedGraph.addEdge(1, 2, 1);
someWeightedGraph.addEdge(1, 3, 4);
someWeightedGraph.addEdge(1, 4, 7);
someWeightedGraph.addEdge(2, 5, 3);
someWeightedGraph.addEdge(3, 6, 5);
someWeightedGraph.addEdge(3, 7, 2);
someWeightedGraph.addEdge(4, 8, 1);
someWeightedGraph.addEdge(5, 9, 4);
someWeightedGraph.addEdge(6, 10, 6);

// Run Dijkstra's algorithm from node 1
const shortestPaths = dijkstra(
	someWeightedGraph,
	someWeightedGraph.nodes.get(1)
);

// Demonstration shortest paths
shortestPaths.forEach((value, key) => {
	console.log(
		`Shortest distance from vertex 1 to vertex ${key.value}: ${value.distance}`
	);
	console.log(
		`Shortest path: ${value.path.map((vertex) => vertex.value).join(' -> ')}`
	);
	console.log('---');
});

// Create a new linked list instance
const singlyLinkedList = new LinkedList();

// Insert elements into the linked list
singlyLinkedList.insert('node1');
singlyLinkedList.insert('node2');

// Display the linked list
console.log(singlyLinkedList); // LinkedList { head: ListNode {value: 'node1', next: ListNode {value: 'node2'}}}
console.log(singlyLinkedList.head.next.value); // "node2"

// Insert new element into the linked list
singlyLinkedList.insert('node3');

// Delete element from the linked list and display updated linked list
console.log(singlyLinkedList.delete('node2'));

// Search for nodes with specified values
console.log(singlyLinkedList.search('node1')); // ListNode {value: 'node1', next: ListNode}
console.log(singlyLinkedList.search('node2')); // null

// Create a new linked list instance
const someLinkedList = new LinkedList();

// Insert elements into the linked list
someLinkedList.insert('1');
someLinkedList.insert('3');
someLinkedList.insert('2');
someLinkedList.insert('5');

// Add loop at 2nd element of the linked list
const cycleLinkedList = makeloop(someLinkedList.head, 2); // 1 -> 3 -> 2 -> 5 -> (cycle:3->2->5) -> ...

// Display the result of checking two different linked list
console.log(hasCycle(cycleLinkedList)); // true (linked list has a cycle)
console.log(hasCycle(singlyLinkedList)); // false (linked list does not have a cycle)
