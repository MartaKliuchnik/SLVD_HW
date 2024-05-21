import BinaryTree from './binaryTree.js';
import TreeNode from '../utils/treeNode.js';

/**
 * Represents a subclass of BinaryTree.
 * Inherits methods for searching and traversing the tree.
 * Provides additional functionality for maintaining the Binary Search Tree (BST) property.
 */
class BinarySearchTree extends BinaryTree {
	// Creates an instance of BinarySearchTree.
	constructor() {
		// Call the constructor of the parent BinaryTree class
		super();
	}

	/**
	 * Inserts a new node with the given data into the BinarySearchTree.
	 * @param {any} data - The data to be added as a value for the new node.
	 * @returns {BinarySearchTree} - This method returns the updated BinarySearchTree instance.
	 */
	insert(data) {
		const newNode = data instanceof TreeNode ? data : new TreeNode(data);

		if (!this.root) {
			//if the tree is empty, set the new node as the root node.
			this.root = newNode;
			return this;
		}

		// If the tree is not empty
		let current = this.root; // Start from the root node

		// Continue iterative insertion until a suitable insertion point for the new node is found.
		while (true) {
			// Traverse to the left subtree of the current node.
			if (data < current.value) {
				if (!current.leftChild) {
					current.leftChild = newNode; // Insert the new node as the left child of the current node
					return this;
				}
				current = current.leftChild;
				// Traverse to the right subtree of the current node.
			} else {
				if (!current.rightChild) {
					current.rightChild = newNode; // Insert the new node as the right child of the current node
					return this;
				}
				current = current.rightChild;
			}
		}
	}
}

export default BinarySearchTree;
