// Task 2: Advanced Tagged Template
const keywords = ['JavaScript', 'template', 'tagged'];
const template =
	'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.';

function highlightKeywords(templateString, arrayOfKeywords) {
	return templateString
		.split(' ')
		.map((item) =>
			/\${.*?}/g.test(item)
				? `<span class='highlight'>${
						arrayOfKeywords[+item.match(/(\d+)/)[0]]
				  }</span>`
				: item
		)
		.join(' ');
}

const highlighted = highlightKeywords(template, keywords);
// console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

// Task 3: Multiline Tagged Template
const code = multiline`
function add(a, b) {
return a + b;
}
`;

function multiline(strings) {
	const lines = strings[0].trim().split('\n');

	const formattedLines = lines.reduce(
		(acc, line, index) => `${acc}\n${index + 1} ${line}`,
		''
	);
	return formattedLines;
}

// console.log(code);

// Task 4: Implementing Debounce Function
function debouncedSearch(query) {
	console.log('Searching for:', query);
}

function debounce(func, delay) {
	let timeout;
	return (...args) => {
		if (timeout !== 0) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

// const inputElement = document.getElementById('search-input');
// inputElement.addEventListener('input', (event) => {
// 	debouncedSearchHandler(event.target.value);
// });

// Task 5: Implementing Throttle Function
// const array = Array.from({ length: 1000 }, (_, i) => `Input ${i}`);
// const divElement = document.getElementById('container');
// for (let i = 0; i < array.length; i++) {
// 	const inputElement = document.createElement('input');
// 	inputElement.value = array[i];
// 	divElement.appendChild(inputElement);
// }

function onScroll(event) {
	console.log('Scroll event:', event);
}

function throttle(func, interval) {
	let timeout;
	return (...args) => {
		if (!timeout) {
			func(...args);
			timeout = setTimeout(() => {
				timeout = null;
			}, interval);
		}
	};
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener('scroll', throttledScrollHandler);

// Task 6: Currying Function Implementation
function multiply(a, b, c) {
	return a * b * c;
}

function curry(func, arity) {
	return function curried(...args) {
		if (args.length >= arity) {
			return func(...args);
		} else {
			return function (...moreArgs) {
				return curried(...args, moreArgs);
			};
		}
	};
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

// console.log('Result:', result); // Expected: 24

// Challenge
const _ = Symbol('_');

const curryWithPlaceholder = (func, arity) => {
	return function curried(...args) {
		if (args.length >= arity && !args.includes(_)) {
			return func(...args);
		} else {
			return function (...moreArgs) {
				const combinedArgs = args
					.map((arg) => (arg === _ && moreArgs.length ? moreArgs.shift() : arg))
					.concat(moreArgs);
				return curried(...combinedArgs);
			};
		}
	};
};

const curriedMultiplyWithPlaceholder = curryWithPlaceholder(multiply, 3);

const stepWithPlaceholder = curriedMultiplyWithPlaceholder(2, _, 4);
console.log(stepWithPlaceholder(3));
console.log(stepWithPlaceholder(10));
