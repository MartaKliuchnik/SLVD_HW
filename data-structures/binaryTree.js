import TreeNode from '../utils/treeNode.js';
import Queue from './queue.js';

/**
 * Represents a BinaryTree class.
 * Provides methods for inserting nodes, searching for a node, and traversing the tree.
 */
class BinaryTree {
	// Creates an instance of binary tree.
	constructor() {
		this.root = null;
	}

	/**
	 * Inserts a new node with the given data into the tree.
	 * @param {any} data - The data to be added as a value for the new node.
	 * @returns {BinaryTree} - This method returns the updated BinaryTree instance.
	 */
	insert(data) {
		const newNode = data instanceof TreeNode ? data : new TreeNode(data);

		if (!this.root) {
			//if the tree is empty, set the new node as the root node.
			this.root = newNode;
			return this;
		}

		/**
		 * If the tree is not empty:
		 * - Create a new instance of the Queue class
		 * - Traverse the tree and find the position to insert the node.
		 */
		const queue = new Queue();
		queue.enqueue(this.root);

		while (!queue.isEmpty()) {
			const temp = queue.dequeue();

			// Insert node as the left child of the parent node.
			if (temp.leftChild === null) {
				temp.leftChild = newNode;
				break;
			} else queue.enqueue(temp.leftChild);

			// Insert node as the rigth child of the parent node.
			if (temp.rightChild === null) {
				temp.rightChild = newNode;
				break;
			} else queue.enqueue(temp.rightChild);
		}
		return this;
	}

	/**
	 * Check if a node with the specified value exists in the binary tree.
	 * @param {any} value - The searching value.
	 * @returns {TreeNode|null} - This method returns the TreeNode if node’s value is existed, otherwise returns null.
	 */
	search(value) {
		// The value is not found in an empty tree
		if (!this.root) return null;

		/**
		 * If the tree is not empty:
		 * - Create a new instance of the Queue class to facilitate BFS traversal.
		 * - Use a breadth-first search (BFS) approach to check the value of each node in the tree.
		 */
		const queue = new Queue(); // Initialize a queue for BFS traversal
		queue.enqueue(this.root); // Initialize the root node to start traversal

		// Continue BFS traversal until the queue is empty
		while (!queue.isEmpty()) {
			const currentNode = queue.dequeue();

			// Check if the current node's value matches the target value
			if (currentNode.value === value) return currentNode;

			// Enqueue the left child if it exists
			if (currentNode.leftChild) {
				queue.enqueue(currentNode.leftChild);
			}

			// Enqueue the rigth child if it exists
			if (currentNode.rightChild) {
				queue.enqueue(currentNode.rightChild);
			}
		}

		return null;
	}

	/**
	 * Traverses the tree post-order.
	 * @param {TreeNode} node - The current node.
	 * @param {function} callback - The callback function to process each node's value.
	 * @returns {undefined} - This method does not return any value.
	 */
	postorderTraversal(node, callback) {
		if (!node) return;
		this.postorderTraversal(node.leftChild, callback);
		this.postorderTraversal(node.rightChild, callback);
		callback(node.value);
	}
}

export default BinaryTree;
