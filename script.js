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
// console.log(chunkArray(numbersArray, 4));

// 2.2
const optimazedChunkArray = (someArray, chunkSize) =>
	someArray.reduce((chunkArray, item, index) => {
		return index % chunkSize === 0
			? [...chunkArray, [item]]
			: chunkArray.map((chunk, i) => {
					return i === chunkArray.length - 1 ? [...chunk, item] : chunk;
			  });
	}, []);

// console.log(optimazedChunkArray(numbersArray, 4));

// Task 3: Array Shuffling
// 3.1
function customShuffle(someArray) {
	return someArray.toSorted(() => Math.random() - 0.5);
}
// console.log(customShuffle(numbersArray));

// 3.2 (Fisher-Yates shuffle algorithm)
function customShuffleAlgorithm(someArray) {
	const shuffledArray = [...someArray];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[randomIndex]] = [
			shuffledArray[randomIndex],
			shuffledArray[i],
		];
	}

	return shuffledArray;
}
// console.log(customShuffleAlgorithm(numbersArray));

// Task 4: Array Intersection and Union
const arr1 = [11, 21, 3, 21];
const arr2 = [3, 2, 11, 0, 21, 3];
// 4.1
function getArrayIntersection(someArray1, someArray2) {
	return someArray1.filter(
		(item, i) => someArray2.includes(item) && someArray1.indexOf(item) === i
	);
}
// console.log(getArrayIntersection(arr1, arr2));

// 4.2
function getArrayUnion(someArray1, someArray2) {
	return Array.from(new Set([...someArray1, ...someArray2]));
}
// console.log(getArrayUnion(arr1, arr2));

// Task 5: Array Performance Analysis
// 5.1
const sampleArray = Array.from({ length: 1000 }, (_, index) => index + 1);

function measureArrayPerformance(func, someArray) {
	const startTime = performance.now();
	func(someArray);
	return performance.now() - startTime;
}
// console.log(measureArrayPerformance(getUniqueness, sampleArray));

// 5.2
const measureArrayPerformance2 = (func) => (someArray) => {
	const startTime = performance.now();
	func(someArray);
	return performance.now() - startTime;
};

const builtInFilter = (someArray) => someArray.filter((num) => num % 2 === 0);

function customFilter(someArray) {
	let filteredArray = [];
	for (let i = 0; i < someArray.length; i++) {
		if (someArray[i] % 2 === 0) {
			filteredArray.push(someArray[i]);
		}
	}
	return filteredArray;
}

const customFilterPerformance =
	measureArrayPerformance2(customFilter)(sampleArray);
const builtInFilterPerfomance =
	measureArrayPerformance2(builtInFilter)(sampleArray);
console.log(`customFilterPerformance = ${customFilterPerformance}`);
console.log(`builtInFilterPerfomance = ${builtInFilterPerfomance}`);
