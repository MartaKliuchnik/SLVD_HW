// Part 1: Class Design

/**
 * Represents a book (Base class) in the online bookstore.
 * Encapsulates book-related data like title, author, isbn, price, and availability.
 * Provides methods to retrieve and manipulate book information.
 * Manages operations related to displaying details about the book.
 */
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

/**
 * Represents a subclass of Book, that specifically models a fiction book.
 * Inherits properties and methods from the Book class.
 * Encapsulates details of a fiction book, including its type ('Fiction').
 */
class FictionBook extends Book {
	constructor(title, author, isbn, price, availability) {
		super(title, author, isbn, price, availability);
		this.type = 'Fiction'; // represents a specific type of book (fiction)
	}
}

/**
 * Represents a subclass of Book, that specifically models a non-fiction book.
 * Inherits properties and methods from the Book class.
 * Encapsulates details of a non-fiction book, including its type ('Non-fiction').
 */
class NonFictionBook extends Book {
	constructor(title, author, isbn, price, availability) {
		super(title, author, isbn, price, availability);
		this.type = 'Non-fiction'; // represents a specific type of book (non-fiction)
	}
}

/**
 * Represents a user in the online bookstore.
 * Encapsulates user-related data including name, email, and unique user ID.
 * Provides methods for interacting with the bookstore, such as browsing books and displaying user information.
 * Manages interactions with the bookstore, including adding books to the cart and placing orders.
 */
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
		this.cart = new Cart(this); // Add own personal's cart for each User in bookstore
	}

	/**
	 * Simulates a user browsing a specific book.
	 * @param {Book} book - The book being browsed by the user.
	 * @returns {undefined} - This method does not return any value.
	 */
	browseBook(book) {
		console.log(
			`${this.name}, you are interested in "${book.title}" by ${
				book.author
			}, which cost $${book.price}
			\n${
				book.availability
					? 'This book available at this moment'
					: 'Anvortunately, this book unavaibale at this moment'
			}`
		);
	}

	/**
	 * Add a book to the user's cart.
	 * @param {Book} book - The book to add to the cart.
	 * @returns {Cart} - The updated cart object after adding the book.
	 */
	addToCart(book) {
		this.cart.addBook(book);
		console.log(`"${book.getTitle()}" book has added to ${this.name}'s cart.`);
		return this.cart;
	}

	/**
	 * Moves the contents of the user's cart to an order.
	 * @returns {Order} - The order created from the user's cart contents.
	 */
	addToOrder() {
		console.log(this.cart);
		return this.cart.createNewOrder(this.cart);
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

/**
 * Represents the user's shopping cart in the online bookstore.
 * Encapsulates the list of books added to the cart.
 * Provide methods for adding/removing books from the cart and calculating the total price.
 * Allows the creation of an order associated with a user's cart.
 */
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
	 * Add a book to the cart.
	 * @param {Book} book - The book to add to the cart.
	 * @returns {Array<Book>} - The updated list of books in the cart.
	 */
	addBook(newBook) {
		if (newBook.isAvailabile()) {
			console.log(`"${newBook.title}" has added to ${this.user.name}'s cart.`);
			this.arrayOfBooks.push(newBook);
		} else {
			console.log(`"${newBook.title}" is currently out of stock.`);
		}
		return this.arrayOfBooks;
	}

	/**
	 * Method to remove choosen book from the cart.
	 * @param {string} book - The book will be removed from the cart.
	 * @returns {Array<Book>} - The updated list of books in the cart.
	 */
	removeBook(removedBook) {
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

	/**
	 * Creates and returns the current user's order.
	 * @returns {Order} - The order created for the current user.
	 */
	createNewOrder() {
		console.log(`${this.user.name}'s order has created`);
		return new Order(this.user, this.arrayOfBooks);
	}
}

/**
 * Represent the user's order in the online bookstore.
 * Encapsulates order-related data like user, list of ordered books, and total order's price.
 * Manages operations related to displaying details about the user's order.
 */
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
		console.log(this.orderedBooks);
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
// console.log(book1.displayDetails());
// console.log(book2.getPrice().toFixed(2));

// Create a few User objects
const userJohn = new User('John', 'john.doe@example.com', 1);
const userPeter = new User('Peter', 'peter.doe@example.com', 2);
const userMark = new User('Mark', 'mark.doe@example.com', 3);
console.log(userPeter.displayDetails());

const shoppingCartJohn = new Cart(userJohn); // Creating instances of the Cart class for John
const shoppingCartPeter = new Cart(userPeter); // Creating instances of the Cart class for Peter

shoppingCartJohn.addBook(book1); // Add books for John's cart
shoppingCartJohn.addBook(book2); // This book isn't available (can't add to the cart)
shoppingCartJohn.addBook(book3);

shoppingCartJohn.removeBook(book3); // Remove book from John's cart
console.log(shoppingCartJohn);

shoppingCartPeter.addBook(book3); // Add book for Peter's cart
shoppingCartPeter.addBook(book1);
console.log(shoppingCartPeter);

console.log(shoppingCartPeter.calculateTotalPrice()); // Get total price for book at the Peter's cart
console.log(shoppingCartJohn.calculateTotalPrice()); // Get total price for book at the John's cart

// Implement the process of placing an order
const orderedBooksForJohn = [book1, book2];
const orderJohn = new Order(userJohn, orderedBooksForJohn); // Create a new order for user John
console.log(orderJohn.displayOrderDetails());
console.log(orderJohn.calculateTotalPrice());

// Part 3: Demonstration

/** Simulating interactions between users, carts, and orders while directly using user methods.
 * - browseBook(book): Browse a book
 * - addToCart(book): Adds a book to the user's cart using the User instance.
 * - addToOrder(): Creates a new order for the user using the User instance.
 */

userJohn.browseBook(book1);

// Creates a new instance of Cart for John and adds a book to his cart (user interacts with a cart).
const shoppingCartForJohn = userJohn.addToCart(book1);
console.log(shoppingCartForJohn);

// Creates a new instance of Order for John based on his cart contents.
const newOrderJohn = userJohn.addToOrder();
console.log(newOrderJohn);

// Interaction instance of Cart for Mark with orders. User Mark adds books to the cart and creates a new order.
const shoppingCartMark = userMark.addToCart(book2); // Add an unavailable book
const newOrderMark = shoppingCartMark.createNewOrder();
newOrderMark.displayOrderDetails();

// Polymorphism

// Create instances of FictionBook and NonFictionBook
const fictionBook1 = new FictionBook(
	'The Alchemist',
	'Paulo Coelho.',
	9780743273000,
	24.5
);
const fictionBook2 = new FictionBook(
	'The Great Gatsby',
	'F. Scott Fitzgerald',
	9780743273001,
	35.7
);

// Create instance of NonFictionBook
const NonFictionBook1 = new NonFictionBook(
	'Code Dependent',
	'Madhumita Murgia',
	9780743272401,
	45.9,
	false
);

// FictionBook and NonFictionBook classes are based on (inherit from) Book, have access to book methods
console.log(fictionBook1.formattedPrice); // Access inherited method 'formattedPrice' from Book class
console.log(fictionBook2.displayDetails()); // Access inherited method 'displayDetails' from Book class
console.log(NonFictionBook1.isAvailabile()); // Check availability using inherited method 'isAvailable' from Book class
