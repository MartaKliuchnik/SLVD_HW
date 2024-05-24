import { polynomialRollingHash } from './hash-function/polynomialRollingHash.js';

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
