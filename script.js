// Part 1: Data Structure Implementations (stack)

/**
 * Represents a stack.
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

// Part 1: Data Structure Implementations (queue)
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
