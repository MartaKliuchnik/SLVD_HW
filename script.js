const products = [
	{ id: 1, price: 100 },
	{ id: 1, price: 200 },
	{ id: 1, price: 300 },
];

// Task 1: Immutability and Pure Functions
// 1.1
function calculateDiscountedPrice(arrayOfProducts, discountPercentage) {
	const newArrayOfProducts = arrayOfProducts.map((product) => {
		const discountPrice =
			product.price - (product.price * discountPercentage) / 100;
		return { ...product, price: discountPrice };
	});

	return newArrayOfProducts;
}
// console.log(calculateDiscountedPrice(products, 10));

// 1.2
function calculateTotalPrice(arrayOfProducts) {
	const totalPrice = arrayOfProducts.reduce((sum, { price }) => sum + price, 0);
	return totalPrice;
}
// console.log(calculateTotalPrice(products));

// Task 2: Function Composition and Point-Free Style
// 2.1
const person = { firstName: 'Billy', lastName: 'Smith' };

const getFirstName = (personObject) => `${personObject.firstName}`;
const getLastName = (personObject) => `${personObject.lastName}`;

const getConcatenationName = (firstName, lastName) =>
	`${firstName} ${lastName}`;

const compose1 = function (fn1, fn2, fn3) {
	return function (personObject) {
		return fn3(fn1(personObject), fn2(personObject));
	};
};

const getFullName = compose1(
	getFirstName,
	getLastName,
	getConcatenationName
)(person);
// console.log(getFullName);

//  2.2
const randomText = 'Hello! hello *JavaScript*, an example hello World';

const getStringFromArray = (array) => {
	return array
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.split(' ');
};

const getUniqueWords = (array) =>
	array.reduce(
		(uniqueWords, word) =>
			uniqueWords.includes(word) ? uniqueWords : [...uniqueWords, word],
		[]
	);

const getAlphabeticalOrder = (array) => array.sort();

const compose2 = function (fn1, fn2, fn3) {
	return function (initialArray) {
		return fn1(fn2(fn3(initialArray)));
	};
};

const filterUniqueWords = compose2(
	getAlphabeticalOrder,
	getUniqueWords,
	getStringFromArray
)(randomText);
// console.log(filterUniqueWords);

// 2.3
const arrayOfStudent = [
	{ name: 'Billy', grades: [4, 4, 4, 5, 5] },
	{ name: 'Tommy', grades: [5, 5, 5, 5] },
];

const getStudent = (students, fn) =>
	students.map((student) => fn(student.grades));

const getGradeForStudent = (studentGrade) => {
	return (
		studentGrade.reduce((sum, grade) => sum + grade, 0) / studentGrade.length
	);
};

const getTotalGrade = (arrayOfGrades) => {
	return (
		arrayOfGrades.reduce((sum, grades) => sum + grades, 0) /
		arrayOfGrades.length
	);
};

const compose3 = function (fn1, fn2, fn3) {
	return function (arrayOfStudent) {
		return fn3(fn1(arrayOfStudent, fn2));
	};
};

const getAverageGrade = compose3(
	getStudent,
	getGradeForStudent,
	getTotalGrade
)(arrayOfStudent);
// console.log(getAverageGrade);

// Task 3: Closures and Higher-Order Functions
// 3.1
function createCounter(initailCount) {
	return function (incrementalCount) {
		return initailCount + incrementalCount;
	};
}

const counter1 = createCounter(10);
// console.log(counter1(2));
const counter2 = createCounter(20);
// console.log(counter2(2));

// 3.2
function repeatFunction(fn, number) {
	return function () {
		if (number < 0) {
			while (true) {
				fn('There is invoking the function indefinitely...');
			}
		} else {
			for (let i = 0; i < number; i++) {
				fn('The function has been repeated');
			}
		}
	};
}

function getRepetitionMessage(message) {
	console.log(message);
}

const getRepeat1 = repeatFunction(getRepetitionMessage, 3);
// getRepeat1();
const getRepeat2 = repeatFunction(getRepetitionMessage, -1);
// getRepeat2();

// Task 4: Recursion and Tail Call Optimization
// 4.1
/* 
CalculateFactorial was optimized by using trampoline functions.
Trampoline function encapsulates the recursive calls within an iterative loop,
results are stored in variables within the loop, not in the call stack.
*/
function calculateFactorial(number) {
	function trampolinaFunction(number, result) {
		if (number === 0) {
			return result;
		} else {
			return trampolinaFunction(number - 1, number * result);
		}
	}
	return trampolinaFunction(number, 1);
}
// console.log(calculateFactorial(4));

// 4.2
/* 
Exponentiation is a operation (a^n)
Exponentiation corresponds to repeated multiplication of the base, n times
*/
function power(base, exponent) {
	return exponent === 0 ? 1 : base * power(base, --exponent);
}
// console.log(power(5, 2));

// Task 5: Lazy Evaluation and Generators
/* 
Lazy evaluation means to delay the evaluation of an expression until it’s needed. 
*/
// 5.1
function lazyMap(array, fn) {
	let i = 0;
	return function () {
		if (i < array.length) {
			const mappingResult = fn(array[i]);
			i++;
			return mappingResult;
		} else {
			return { done: true };
		}
	};
}

const checkLazyMap = lazyMap([1, 2, 3, 4], (number) => ({
	value: number,
	done: false,
}));
// console.log(checkLazyMap());
// console.log(checkLazyMap());
// console.log(checkLazyMap());
// console.log(checkLazyMap());
// console.log(checkLazyMap());

// 5.2
//  F(n) = F(n-1) + F(n-2), examples: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...]
function fibonacciGenerator() {
	let current = 0;
	let next = 1;
	let temp;

	return function () {
		temp = current;
		current = current + next;
		next = temp;
		return temp;
	};
}

const getFibonacciValue = fibonacciGenerator();

console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
console.log(getFibonacciValue());
