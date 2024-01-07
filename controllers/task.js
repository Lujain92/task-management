import { fork } from 'child_process';
import errorMessages from '../util/errors-messages.js';
import Task from '../models/task.js';
import { errorHandler, overDueTask } from '../util/helper.js';

/**
 * Renders the tasks list view.
 * Fetches all tasks from the database and renders the tasks-list view with the fetched tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.fetchAll();

        const child = fork('util/child.js');
        child.send({ tasks });
        process.on('exit', (code) => {
            console.log('code', code);
        });

        res.render('tasks-list', {
            tasks: tasks,
        });
    } catch (err) {
        return errorHandler(
            err,
            next,
            errorMessages.serverError.message,
            errorMessages.serverError.status,
        );
    }
};

/**
 * Renders the tasks list view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getTask = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.redirect('/task');
        }

        res.render('task-detail', {
            task: task,
        });
    } catch (err) {
        return errorHandler(
            err,
            next,
            errorMessages.serverError.message,
            errorMessages.serverError.status,
        );
    }
};

/**
 * Deletes a task by its ID from the database.
 * Redirects to the '/task' route after deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.body.taskId;
        await Task.deleteById(taskId);
        console.log('DESTROYED Task');

        res.redirect('/task');
    } catch (err) {
        return errorHandler(
            err,
            next,
            errorMessages.serverError.message,
            errorMessages.serverError.status,
        );
    }
};

/**
 * Renders the edit task view for a specific task.
 * Fetches a task by ID and renders the edit-task view for editing.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getEditTask = async (req, res, next) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/task');
        }

        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.redirect('/task');
        }

        res.render('edit-task', { editing: editMode, task });
    } catch (err) {
        return errorHandler(
            err,
            next,
            errorMessages.serverError.message,
            errorMessages.serverError.status,
        );
    }
};

/**
 * Updates a task in the database with new information.
 * Redirects to the '/task' route after updating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const postEditTask = async (req, res, next) => {
    try {
        const { taskId, name, checked, dueDate } = req.body;
        const overDue = overDueTask(checked, dueDate);
        const task = new Task(name, checked, dueDate, taskId, overDue);
        await task.save();
        console.log('UPDATED Task!');

        res.redirect('/task');
    } catch (err) {
        return errorHandler(
            err,
            next,
            errorMessages.serverError.message,
            errorMessages.serverError.status,
        );
    }
};

/**
 * Renders the add task view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAddTask = (req, res, next) => {
    res.render('edit-task');
};

/**
 * Creates a new task and saves it to the database.
 * Redirects to the '/task' route after creating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const postAddTask = async (req, res, next) => {
    try {
        const { name, checked, dueDate } = req.body;
        const task = new Task(name, checked, dueDate, null);
        await task.save();
        console.log('Created Task');

        res.redirect('/task');
    } catch (err) {
        return err.code ===11000
            ? errorHandler(
                  err,
                  next,
                  errorMessages.duplicateKey.message,
                  errorMessages.duplicateKey.status,
              )
            : errorHandler(
                  err,
                  next,
                  errorMessages.serverError.message,
                  errorMessages.serverError.status,
              );
    }
};

export {
    deleteTask,
    getAddTask,
    getEditTask,
    getTask,
    getTasks,
    postAddTask,
    postEditTask,
};
