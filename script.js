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

const inputElement = document.getElementById('search-input');
inputElement.addEventListener('input', (event) => {
	debouncedSearchHandler(event.target.value);
});
