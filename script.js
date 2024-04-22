// Task 1: Advanced Array Filtering
// 1.1
const numbersArray = [1, 2, 3, 3, 3, 2, 4, 5, 1, 0];

const getUniqueness = (someArray) => {
	return someArray.filter((item, i, arr) => arr.indexOf(item) === i);
};
function customFilterUnique(arr, callback) {
	return callback(arr);
}
// console.log(customFilterUnique(numbersArray, getUniqueness));

// 1.2
const usersArray = [
	{ name: 'Tommy', age: 28 },
	{ name: 'Alex', age: 18 },
	{ name: 'Anna', age: 8 },
	{ name: 'Peter', age: 19 },
];

const getAdultUsers = (someArray) => {
	return someArray.filter(({ age }) => age >= 18);
};
// console.log(customFilterUnique(usersArray, getAdultUsers));

// Task 2: Array Chunking
// 2.1
function chunkArray(someArray, chunkSize) {
	let result = [];
	for (let i = 0; i < someArray.length; i += chunkSize) {
		let chunk = someArray.slice(i, i + chunkSize);
		result.push(chunk);
	}
	return result;
}
console.log(chunkArray(numbersArray, 4));

// 2.2
const optimazedChunkArray = (someArray, chunkSize) =>
	someArray.reduce((chunkArray, item, index) => {
		return index % chunkSize === 0
			? [...chunkArray, [item]]
			: chunkArray.map((chunk, i) => {
					return i === chunkArray.length - 1 ? [...chunk, item] : chunk;
			  });
	}, []);

console.log(optimazedChunkArray(numbersArray, 4));
