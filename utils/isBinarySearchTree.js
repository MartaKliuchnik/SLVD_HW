/**
 * Check whether the given root (and its descendants) satisfies the BST property
 * @param {TreeNode} root - The root node of the tree.
 * @returns {boolean} - Returns true if the tree is a valid BST, otherwise false.
 */
export function isBinarySearchTree(root, min = -Infinity, max = Infinity) {
	//An empty tree is a BST by definition

	if (!root) return true;

	// Check if the current node's value violates the BST property
	if (root.value < min || root.value > max) {
		return false;
	}

	// Recursively check the left and right subtrees
	return (
		isBinarySearchTree(root.leftChild, min, root.value) && // the maximum allowable value is the current node's value
		isBinarySearchTree(root.rightChild, root.value, max) // the minimun allowable value is the current node's value
	);
}
