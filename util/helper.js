
/**
 * Checks if a task is overdue based on its checked status and due date.
 * @param {boolean|null|undefined} checked - The checked status of the task.
 * @param {string} dueDate - The due date of the task in string format.
 * @returns {boolean} Returns true if the task is overdue, otherwise false.
 */
const overDueTask = (checked, dueDate) => {
    if ((checked ===  undefined || checked === null ) && new Date(dueDate) < new Date()) {
        return true;
     }
    return false
  }

export { overDueTask }