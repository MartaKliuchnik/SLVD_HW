// Part 1: Class Design

//  Represents a book.
class Book {
	/**
	 * Creates a new instance of Book.
	 * Constructor runs with the given argument:
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 * @param {number} isbn - The isbn (unique identifier) of the book.
	 * @param {number} price - The price of the book.
	 * @param {boolean} availability - The availability of the book.
	 */
	constructor(title, author, isbn, price, availability) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.price = price;
		this.availability = availability;
	}

	/**
	 * Display details about the book.
	 * This method logs the books title, author, isbn, price, and availability to the console.
	 * @returns {undefined} - This method does not return any value.
	 */
	displayDetails() {
		console.log(`Title: ${this.title}`);
		console.log(`Author: ${this.author}`);
		console.log(`Isbn: ${this.isbn}`);
		console.log(`Price: ${this.price}`);
		console.log(`Availability: ${this.availability}`);
	}
}

//  Represents an user
class User {
	/**
	 * Creates a new instance of User.
	 * Constructor runs with the given argument:
	 * @param {string} name - The name of the user.
	 * @param {string} email - The email of the user.
	 * @param {number} userId - The unique user ID of the user.
	 */
	constructor(name, email, userId) {
		this.name = name;
		this.email = email;
		this.userId = userId;
	}

	/**
	 * Display information about the user.
	 * This method logs the user's name, email, and user ID to the console.
	 * @returns {undefined} - This method does not return any value.
	 */
	displayDetails() {
		console.log(`Name: ${this.name}`);
		console.log(`Email: ${this.email}`);
		console.log(`userId: ${this.userId}`);
	}
}

//  Represents the shopping cart.
class Cart {
	/**
	 * Creates a new instance of Cart.
	 * Constructor runs with the given argument:
	@param {User} user - The user associated with the cart.
	 */
	constructor(user) {
		this.user = user;
		this.arrayOfBooks = [];
	}

	/**
	 * Adds a book to the cart.
	 * @param {Book} book - The book to add to the cart.
	 * @returns {undefined} - This method does not return any value.
	 */
	addBooks(book) {}

	/**
	 * Method to remove choosen book from the cart.
	 * @param {string} book - The book will be removed from the cart.
	 * @returns {undefined} - This method does not return any value.
	 */
	removeBooks(book) {}

	/**
	 * Calculates the total price of all books in the cart.
	 * @returns {number} - The total price of all books in the cart.
	 */
	calculateTotalPrice() {}
}

// Represent the user's order.
class Order {
	/**
	 * Creates a new instance of an Order.
	 * Constructor runs with the given argument:
	 * @param {User} user - The user associated with the order.
	 * @param {Array<Book>} orderedBooks - The books put into order.
	 */
	constructor(user, orderedBooks) {
		this.user = user;
		this.orderedBooks = orderedBooks;
		this.totalPrice = this.getTotalPrice();
	}

	/**
	 * Calculates the total price of all books in the order.
	 * @returns {number} - The total price of all books in the order.
	 */
	getTotalPrice() {}
}
