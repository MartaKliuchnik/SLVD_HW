const products = [
	{ id: 1, price: 100 },
	{ id: 1, price: 200 },
	{ id: 1, price: 300 },
];

// Task 1: Immutability and Pure Functions
function calculateDiscountedPrice(arrayOfProducts, discountPercentage) {
	const newArrayOfProducts = arrayOfProducts.map((product) => {
		const discountPrice =
			product.price - (product.price * discountPercentage) / 100;
		return { ...product, price: discountPrice };
	});

	return newArrayOfProducts;
}

function calculateTotalPrice(arrayOfProducts) {
	const totalPrice = arrayOfProducts.reduce((sum, { price }) => sum + price, 0);
	return totalPrice;
}

console.log(calculateDiscountedPrice(products, 10));
console.log(calculateTotalPrice(products));
