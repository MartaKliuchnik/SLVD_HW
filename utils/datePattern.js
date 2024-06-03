// Define the specified regex pattern suitable for the format ( "2022-01-01T12:00:00Z")
const datePattern = /"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)"/g;

module.exports = datePattern;

/**
 * "(...)" - matches a double quote character, ensuring the match includes the quotes;
 * '\d{count}' - ensures the match exactly special count of digits;
 * '-' - matches a hyphen, separating the year from the month / the month from the day;
 * 'T' - matches the letter T (which separates the date from the time);
 * 'Z' - matches the letter Z (indicating that the time is in UTC timezone);
 * '(?:\.\d+)?' - non-capturing group matches an optional decimal point followed by one or more digits (representing milliseconds).
 */
