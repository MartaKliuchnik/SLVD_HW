// Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm)
/**
 * Check whether the given linked list has a cycle.
 * @param {ListNode} head - The head node of the LinkedList.
 * @returns {boolean} - This function returns true if the linked list has a cycle, otherwise false.
 */
export function hasCycle(head) {
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
