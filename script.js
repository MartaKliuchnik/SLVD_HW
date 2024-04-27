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
console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
