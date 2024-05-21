/**
 * Create a cycle in the linked list at the k-th position
 * @param {ListNode} head - The head node of the LinkedList.
 * @param {number} k - The position to create the loop.
 * @returns {ListNode} - Returns the head of the linked list with loop at k-th element.
 */
export function makeloop(head, k) {
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
