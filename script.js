import { polynomialRollingHash } from './hash-function/polynomialRollingHash.js';
import SeparateChaining from './collision-handling/separateChaining.js';

// Define two different strings representing user names
const user1 = 'alex';
const user2 = 'john';

// Calculate the hash value for each user name, store the result in variables
const indexForUser1 = polynomialRollingHash(user1);
console.log(indexForUser1); // Output hash value for user1: 1720162

const indexForUser2 = polynomialRollingHash(user2);
console.log(indexForUser2); // Output hash value for user1: 425237

/**
 * Usage in the hash table:
 * Storing 'alex' at index 720162
 * hashTable[720162] = 'alex'
 *
 * Storing 'john' at index 425237
 * hashTable[425237] = 'john'
 */

// Collision Handling:
// Create a new hash table with size 5
const someHashTable = new SeparateChaining(5);
console.log(someHashTable);

// Insert some elements
someHashTable.insert('alex', 'Alex Smit');
someHashTable.insert('john', 'John Smit');
someHashTable.insert('bob', 'Bob Smit');

// Demonstrate collision handling (for 'john' and 'alex' in hash table with length 5 index is 2)
console.log(someHashTable); // Hash table with collision handled at index 2: LinkedList {head: ListNode, size: 2}

// Retrieve elements
console.log(someHashTable.find('alex')); // Alex Smit
console.log(someHashTable.find('john')); // John Smit
