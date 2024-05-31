/**
 * Represents an ErrorHandling class.
 * Provides informative error messages.
 */
class ErrorHandling extends Error{
    constructor(message, position = null) {
        super(message);
        this.position = position;
        this.name = 'ErrorHandling';
    }

    /**
     * Throws an error with a message and optional position.
     * @param {string} message - The error message.
     * @param {number} [position=null] - The optional position where the error occurred.
     */
    static throwError(message, position = null) {
        if (position !== null) {
            throw new Error(`${message} at position ${position}`);
        } else {
            throw new Error(message);
        }
    }
}

module.exports = ErrorHandling;