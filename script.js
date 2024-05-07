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
	constructor(title, author, isbn, price, availability = true) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.price = price;
		this.availability = availability;
	}

	getTitle() {
		return this.title;
	}

	getAuthor() {
		return this.author;
	}

	getIsbn() {
		return this.isbn;
	}

	getPrice() {
		return this.price;
	}

	get formattedPrice() {
		return `$${this.price}`;
	}

	isAvailabile() {
		return this.availability;
	}

	setAvailability(availability) {
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
		console.log(`Price: ${this.formattedPrice}`);
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
	 * @returns {Array<Book>} - The updated list of books in the cart.
	 */
	addBooks(newBook) {
		if (newBook.isAvailabile()) {
			this.arrayOfBooks.push(newBook);
		}
		return this.arrayOfBooks;
	}

	/**
	 * Method to remove choosen book from the cart.
	 * @param {string} book - The book will be removed from the cart.
	 * @returns {Array<Book>} - The updated list of books in the cart.
	 */
	removeBooks(removedBook) {
		this.arrayOfBooks = this.arrayOfBooks.filter(
			({ isbn }) => isbn !== removedBook.isbn
		);
		return this.arrayOfBooks;
	}

	/**
	 * Calculates the total price of all books in the cart.
	 * @returns {number} - The total price of all books in the cart.
	 */
	calculateTotalPrice() {
		return this.arrayOfBooks.reduce(
			(totalPrice, book) => totalPrice + book.getPrice(),
			0
		);
	}
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
		this.orderedBooks = this.filterAvailableBooks(orderedBooks);
		this.totalPrice = this.calculateTotalPrice();
	}

	/**
	 * Filters out unavailable (out of stock) books from the ordered books list.
	 * @param {Array<Book>} books - The list of books to filter.
	 * @returns {Array<Book>} - The list of available books.
	 */
	filterAvailableBooks(books) {
		return books.filter((book) => book.availability);
	}

	/**
	 * Calculates the total price of all available books in the order.
	 * @returns {number} - The total price of all available books in the order.
	 */
	calculateTotalPrice() {
		return this.orderedBooks.reduce(
			(totalPrice, book) => totalPrice + book.getPrice(),
			0
		);
	}

	/**
	 * Display information about the user's order.
	 * This method logs the user's name, his choosen books and total price to the console.
	 * @returns {undefined} - This method does not return any value.
	 */
	displayOrderDetails() {
		console.log(`Order details for ${this.user.name}:`);
		console.log(
			`Books:\n${this.orderedBooks
				.map((book, index) => `${index + 1}. ${book.title}`)
				.join('\n')}`
		);
		console.log(`Total price: $${this.calculateTotalPrice().toFixed(2)}`);
	}
}

// Part 2: Implementation
// Instantiate multiple Book objects
const book1 = new Book('1984', 'George Orwell', '9780451524935', 10.1);
const book2 = new Book(
	'Animal Farm',
	'George Orwell',
	'9780451524444',
	12.434,
	false
);
const book3 = new Book('Burmese Days', 'George Orwell', '9780451524567', 20.2);
console.log(book1.displayDetails());
console.log(book2.getPrice().toFixed(2));

// Create a few User objects
const userJohn = new User('John', 'john.doe@example.com', 1);
const userPeter = new User('Peter', 'peter.doe@example.com', 2);
const userMark = new User('Mark', 'mark.doe@example.com', 3);
console.log(userPeter.displayDetails());

const shoppingCartJohn = new Cart(userJohn); // Creating instances of the Cart class for John
const shoppingCartPeter = new Cart(userPeter); // Creating instances of the Cart class for Peter

shoppingCartJohn.addBooks(book1); // Add books for John's cart
shoppingCartJohn.addBooks(book2); // This book isn't available (can't add to the cart)
shoppingCartJohn.addBooks(book3);

shoppingCartJohn.removeBooks(book3); // Remove book from John's cart
console.log(shoppingCartJohn);

shoppingCartPeter.addBooks(book3); // Add book for Peter's cart
shoppingCartPeter.addBooks(book1);
console.log(shoppingCartPeter);

console.log(shoppingCartPeter.calculateTotalPrice()); // Get total price for book at the Peter's cart
console.log(shoppingCartJohn.calculateTotalPrice()); // Get total price for book at the John's cart

// Implement the process of placing an order
const orderedBooksForJohn = [book1, book2];
const orderJohn = new Order(userJohn, orderedBooksForJohn); // Create a new order for user John
console.log(orderJohn.displayOrderDetails());
console.log(orderJohn.calculateTotalPrice());
