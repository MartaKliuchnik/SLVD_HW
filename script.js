// Task 1: Implement promiseAll Function
const promises1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

function promiseAll(arrayOfPromises) {
	return new Promise((resolve, reject) => {
		let accumulator = [];
		let currentLength = 0;

		arrayOfPromises.forEach((singlePromise, index) => {
			Promise.resolve(singlePromise)
				.then((value) => {
					accumulator[index] = value;
					currentLength++;
					if (currentLength === arrayOfPromises.length) resolve(accumulator);
				})
				.catch((e) => reject(e));
		});
	});
}

promiseAll(promises1)
	.then((results) => {
		console.log('All promises resolved:', results); // Expected: [1, 2, 3]
	})
	.catch((error) => {
		console.error('At least one promise rejected:', error);
	});

// Task 2: Implement promiseAllSettled Function
const promises = [
	Promise.resolve(1),
	Promise.reject('Error occurred'),
	Promise.resolve(3),
];

function promiseAllSettled(arrayOfPromises) {
	return arrayOfPromises.reduce((accumulator, singlePromises) => {
		return accumulator.then((array) => {
			return Promise.resolve(singlePromises)
				.then((valueResult) => {
					return [...array, { status: 'fulfilled', value: valueResult }];
				})
				.catch((e) => {
					return [...array, { status: 'rejected', reason: e }];
				});
		});
	}, Promise.resolve([]));
}

promiseAllSettled(promises).then((results) => {
	console.log('All promises settled:', results);
	// Expected: [{ status: 'fulfilled', value: 1 },
	//            { status: 'rejected', reason: 'Error occurred' },
	//            { status: 'fulfilled', value: 3 }]
});

// Task 3: Implement Chaining of Promises as a Separate Function
function asyncFunction1() {
	return Promise.resolve('Result from asyncFunction1');
}
function asyncFunction2(data) {
	return Promise.resolve(data + ' - Result from asyncFunction2');
}
function asyncFunction3(data) {
	return Promise.resolve(data + ' - Result from asyncFunction3');
}

function chainPromises(array) {
	return array.reduce(
		(chain, func) =>
			(chain = chain.then((prevResult) => {
				return func(prevResult);
			})),
		Promise.resolve()
	);
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
chainPromises(functionsArray)
	.then((result) => {
		console.log('Chained promise result:', result);
		// Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
	})
	.catch((error) => {
		console.error('Chained promise error:', error);
	});

// Task 4: Implement promisify Function
function callbackStyleFunction(value, callback) {
	setTimeout(() => {
		if (value > 0) {
			callback(null, value * 2);
		} else {
			callback('Invalid value', null);
		}
	}, 1000);
}

function promisify(fn) {
	return (...args) => {
		return new Promise((resolve, reject) => {
			function customCallback(err, ...results) {
				if (err) {
					reject(err);
				} else {
					resolve(results ? results[0] : results);
				}
			}

			args.push(customCallback);
			fn.call(this, ...args);
		});
	};
}

const promisedFunction = promisify(callbackStyleFunction);
promisedFunction(3)
	.then((result) => {
		console.log('Promised function result:', result); // Expected: 6
	})
	.catch((error) => {
		console.error('Promised function error:', error);
	});
