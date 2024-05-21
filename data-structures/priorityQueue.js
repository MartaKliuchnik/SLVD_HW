import Queue from './queue.js';

/**
 * Represents the PriorityQueue for realizing Dijkstra’s Shortest Path Algorithm.
 * Extends the base Queue class.
 * Contains vertex’s value and adjacent vertices.
 */
class PriorityQueue extends Queue {
	/**
	 * Enqueues an element with a specified priority.
	 * @param {any} element - The element to be enqueued.
	 * @param {number} priority - The priority associated with the element.
	 * @returns {undefined} - This method does not return any value.
	 */
	enqueue(element, priority) {
		this.queue.push({ element, priority });
		this.sort();
	}

	/**
	 * Sorts the elements in the queue based on their priority.
	 * @returns {undefined} - This method does not return any value.
	 */
	sort() {
		this.queue.sort((a, b) => a.priority - b.priority);
	}
}

export default PriorityQueue;
