/**
 * Checks if a task is overdue based on its checked status and due date.
 * @param {boolean|null|undefined} checked - The checked status of the task.
 * @param {string} dueDate - The due date of the task in string format.
 * @returns {boolean} Returns true if the task is overdue, otherwise false.
 */
const overDueTask = (checked, dueDate, errorMessage) => {
    if (
        (checked === undefined || checked === null) &&
        new Date(dueDate) < new Date()
    ) {
        return true;
    }
    return false;
};

// const overDueTask = (checked, dueDate) => (checked ?? true) && new Date(dueDate) < new Date();

/**
 * Handles errors by logging and formatting error information before passing it to the 'next' function.
 * @param {Object} err - The error object to handle.
 * @param {Function} next - The function to call to pass the error.
 * @param {string} errorMessage - The message to set in the Error object.
 * @param {number} status - The HTTP status code to set in the Error object.
 * @returns {Error} - Returns an Error object with updated properties and calls the 'next' function with the error.
 */
const errorHandler = (err, next, errorMessage, status) => {
    console.error(err);
    const error = new Error(err);
    error.httpStatusCode = status;
    error.message = errorMessage;
    return next(error);
};

export { errorHandler, overDueTask };
