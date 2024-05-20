// Part 1: Data Structure Implementations (Stack)
/**
 * Represents a Stack.
 * Provides methods for adding, retrieving, and removing elements from the stack.
 */
class Stack {
	// Creates an instance of Stack.
	constructor() {
		this.stack = [];
	}

	/**
	 * Adds a new element at the top of the stack.
	 * @param {any} newElement - The new element to be added at the top of the stack.
	 * @returns {Stack} - This method returns the updated Stack instance.
	 */
	push(newElement) {
		this.stack.push(newElement);
		return this;
	}

	/**
	 * Removes and returns the top element of the stack.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	pop() {
		if (this.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.stack.pop();
		}
	}

	/**
	 * Returns the top element of the stack without removing it.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	peek() {
		if (this.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.stack[this.stack.length - 1];
		}
	}

	/**
	 * Check if the stack is empty.
	 * @returns {boolean} - This method returns true if the stack is empty, otherwise false.
	 */
	isEmpty() {
		return this.stack.length === 0;
	}
}

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

// Part 2: Algorithmic Problems
/**
 * Represents a subclass of Stack.
 * Inherits methods for adding, retrieving, and removing elements from the Stack class.
 * Provides methods for getting max and min elements of the stack.
 */
class MinMaxStack extends Stack {
	// Creates an instance of MinMaxStack.
	constructor() {
		// Call the constructor of the parent Stack class
		super();
		// Using Stack instances for minStack and maxStack to get access to parent's methods
		this.minStack = new Stack();
		this.maxStack = new Stack();
	}

	/**
	 * Display the top element of the minStack (constant time O(1)).
	 * Reuse the parent's (Stack class) peek and isEmpty methods.
	 * @returns {any} - This method returns the top element of the minStack.
	 * @returns {undefined} - This method does not return any value in case when minStack is empty or @throws {Error} - Throws an error if the minStack is empty.
	 */
	getMin() {
		if (this.minStack.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - minStack is empty');
		} else {
			return this.minStack.peek();
		}
	}

	/**
	 * Display the top element of the maxStack (constant time O(1)).
	 * Reuse the parent's (Stack class) peek and isEmpty methods.
	 * @returns {any} - This method returns the top element of the maxStack.
	 * @returns {undefined} - This method does not return any value in case when maxStack is empty or @throws {Error} - Throws an error if the maxStack is empty.
	 */
	getMax() {
		if (this.maxStack.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - maxStack is empty');
		} else {
			return this.maxStack.peek();
		}
	}

	/**
	 * Adds a new element at the top of the stack.
	 * Reuse the parent's (Stack class) push, peek and isEmpty methods.
	 * Extend the push method duty to update minStack and maxStack.
	 * @param {any} newElement - The new element to be added at the top of the stack.
	 * @returns {MinMaxStack} - This method returns the updated MinMaxStack instance.
	 */
	push(newElement) {
		super.push(newElement); // Call the push method of the parent Stack class

		// Adds a new element at the top of the minStack
		if (this.minStack.isEmpty() || newElement < this.minStack.peek()) {
			this.minStack.push(newElement);
		}

		// Adds a new element at the top of the maxStack
		if (this.maxStack.isEmpty() || newElement > this.maxStack.peek()) {
			this.maxStack.push(newElement);
		}

		return this;
	}

	/**
	 * Removes and returns the top element of the stack.
	 * Reuse the parent's (Stack class) pop, peek and isEmpty methods.
	 * Extend the pop method duty to update minStack and maxStack.
	 * @returns {any} - This method returns the top element of the stack.
	 * @returns {undefined} - This method does not return any value in case when stack is empty or @throws {Error} - Throws an error if the stack is empty.
	 */
	pop() {
		if (super.isEmpty()) {
			return console.error('Underflow - stack is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			const poppedElement = super.pop();

			if (poppedElement === this.minStack.peek()) {
				this.minStack.pop();
			}

			if (poppedElement === this.maxStack.peek()) {
				this.maxStack.pop();
			}

			return poppedElement;
		}
	}
}

// Demonstration:
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

// Part 1: Data Structure Implementations (Queue)
/**
 * Represents a Queue.
 * Provides methods for adding, removing and returning elements from the queue.
 */
class Queue {
	// Creates an instance of Queue.
	constructor() {
		this.queue = [];
	}

	/**
	 * Adds a new element to the rear of the queue.
	 * @param {any} newElement - The new element to be added to the queue.
	 * @returns {Queue} - This method returns the updated Queue instance.
	 */
	enqueue(newElement) {
		this.queue.push(newElement);
		return this;
	}

	/**
	 * Removes and returns the element from the front of the queue.
	 * @returns {any} - This method returns the front element of the queue.
	 * @returns {undefined} - This method does not return any value in case when queue is empty or @throws {Error} - Throws an error if the queue is empty.
	 */
	dequeue() {
		if (this.isEmpty()) {
			return console.error('Underflow - queue is empty');
		} else {
			return this.queue.shift();
		}
	}

	/**
	 * Returns the front element of the queue without removing it.
	 * @returns {any} - This method returns the front element of the queue.
	 * @returns {undefined} - This method does not return any value in case when queue is empty or @throws {Error} - Throws an error if the queue is empty.
	 */
	peek() {
		if (this.isEmpty()) {
			return console.error('Underflow - queue is empty'); // or throw new Error('Underflow - stack is empty');
		} else {
			return this.queue[0];
		}
	}

	/**
	 * Check if the queue is empty.
	 * @returns {boolean} - This method returns true if the queue is empty, otherwise false.
	 */
	isEmpty() {
		return this.queue.length === 0;
	}
}

// Demonstration:
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
console.log(someQueue); // Queue {queue: Array(0)}

// Part 1: Data Structure Implementations (Binary Tree)
/**
 * Represents a TreeNode class (data structure with a value and links to its descendants).
 * Contains a value and two child: left and right.
 */
class TreeNode {
	constructor(value) {
		this.value = value;
		this.leftChild = null;
		this.rightChild = null;
	}
}

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

/**
 * Demonstration:
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
console.log(someBinaryTree.search('Div')); // TreeNode {value: 'Div'}
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

// Part 2: Algorithmic Problems
/**
 * Check whether the given root (and its descendants) satisfies the BST property
 * @param {TreeNode} root - The root node of the tree.
 * @returns {boolean} - Returns true if the tree is a valid BST, otherwise false.
 */
function isBinarySearchTree(root, min = -Infinity, max = Infinity) {
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

// Part 1: Data Structure Implementations (Linked List)
/**
 * Represents a node in the linked list.
 * Contains a value and a pointer to the next node.
 */
class ListNode {
	// Initializes a new node.
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}
/**
 * Represents a singly linked list.
 * Provides methods for inserting nodes, deleting nodes, and searching for a node.
 */
class LinkedList {
	// Initializes a new node
	constructor() {
		this.head = null;
		this.size = 0; // The size of the entire linked list.
	}

	/**
	 * Inserts a new node with the given `newElement` value at the end of the linked list.
	 * @param {any} newElement - The element to insert into the linked list.
	 * @returns {LinkedList} - This method returns the updated LinkedList instance.
	 */
	insert(newElement) {
		const node = new ListNode(newElement);

		let current;

		// If the linked list is empty, set the new node as the head
		if (!this.head) {
			this.head = node;
		} else {
			current = this.head;

			// Traverse to the end of the linked list to find the last node
			while (current.next) {
				current = current.next;
			}

			// Append the new node to the end of the linked list.
			current.next = node;
		}
		// Increment the size of the linked list
		this.size++;

		return this.head;
	}

	/**
	 * Removes the node containing the specified value from the linked list.
	 * @param {any} element - The value of the element to be removed from the linked list.
	 * @returns {LinkedList|null} - This method returns the updated LinkedList instance if the node exists, otherwise returns null.
	 */
	delete(element) {
		// If the linked list is empty, return null
		if (!this.head) {
			return null;
		}

		// If the element to be deleted is at the head of the list, remove the head node by updating the head pointer
		if (this.head.value === element) {
			this.head = this.head.nest;
			size--;
			return this;
		}

		// Traverse the linked list to find the node containing the specified element
		let current = this.head;
		while (current.next) {
			if (current.next.value === element) {
				current.next = current.next.next;
				this.size--;
				return this;
			}
			current = current.next; // Move to the next node
		}
		return null;
	}

	/**
	 * Searches for the node with the specified value in the linked list.
	 * @param {any} element - The value to search for in the linked list.
	 * @returns {ListNode|null} - This method returns the node containing the specified value, or null if not found.
	 */
	search(element) {
		// If the linked list is empty, return null
		if (!this.head) {
			return null;
		}

		// Traverse the linked list to find the node containing the specified element
		let current = this.head;
		while (current) {
			if (current.value === element) {
				return current;
			}
			current = current.next; // Move to the next node
		}

		return null;
	}
}
// Demonstration:
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
console.log(singlyLinkedList.search('node1')); // ListNode {value: 'node1', next: ListNode}
console.log(singlyLinkedList.search('node2')); // null

// Part 2: Algorithmic Problems - Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm)
/**
 * Check whether the given linked list has a cycle.
 * @param {ListNode} head - The head node of the LinkedList.
 * @returns {boolean} - This function returns true if the linked list has a cycle, otherwise false.
 */
function hasCycle(head) {
	// If head doesn't exist immediately return false, there is no cycle.
	if (!head || !head.next) {
		return false;
	}

	// Initiate a slow "tortoise" and fast "hare" pointer (both pointers start at the head)
	let tortoise = head;
	let hare = head;

	// Traverse the linked list until the fast "hare" pointer, and the next node still isn't null
	while (hare && hare.next) {
		// Move the tortoise (one node at a time), and the hare (two nodes at a time).
		tortoise = tortoise.next;
		hare = hare.next.next;

		// If the tortoise and hare are pointing to the same node, there is a cycle.
		if (tortoise === hare) {
			return true;
		}
	}
	// If hare and/or hare.next is null, there is no cycle
	return false;
}
// Demonstration:
// Create a new linked list instance
const someLinkedList = new LinkedList();

// Insert elements into the linked list
someLinkedList.insert('1');
someLinkedList.insert('3');
someLinkedList.insert('2');
someLinkedList.insert('5');

/**
 * Create a cycle in the linked list at the k-th position
 * @param {ListNode} head - The head node of the LinkedList.
 * @param {number} k - The position to create the loop.
 * @returns {ListNode} - Returns the head of the linked list with loop at k-th element.
 */
function makeloop(head, k) {
	if (k <= 0 || !head) {
		return head;
	}

	let temp = head;
	let count = 1;

	// Traverse the linked list until the loop point is found
	while (count < k && temp.next) {
		temp = temp.next;
		count++;
	}

	// If k is larger than the length of the list, no loop is created
	if (count < k) {
		return head;
	}

	// Backup the joint point
	let joint_point = temp;

	// Traverse remaining nodes
	while (temp.next) temp = temp.next;

	// Join the last node to k-th element
	temp.next = joint_point;
	return head;
}

// Add loop at 2nd element of the linked list
const cycleLinkedList = makeloop(someLinkedList.head, 2); // 1 -> 3 -> 2 -> 5 -> (cycle:3->2->5) -> ...

// Display the result of checking two different linked list
console.log(hasCycle(cycleLinkedList)); // true (linked list has a cycle)
console.log(hasCycle(singlyLinkedList)); // false (linked list does not have a cycle)
