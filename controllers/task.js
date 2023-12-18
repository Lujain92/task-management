const Task = require('../models/task');

/**
 * Renders the tasks list view.
 * Fetches all tasks from the database and renders the tasks-list view with the fetched tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getTasks = (req, res, next) => {
    Task.fetchAll()
        .then(tasks => {
            console.log(tasks);
            res.render('tasks-list', {
                tasks: tasks
            });
        })
        .catch(err => {
            console.log(err);
            // Handle error
        });
}

/**
 * Renders the tasks list view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getTask = (req, res, next) => {
    res.render('tasks-list');
}

/**
 * Deletes a task by its ID from the database.
 * Redirects to the '/task' route after deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.deleteTask = (req, res, next) => {
    const taskId = req.body.taskId;
    Task.deleteById(taskId)
        .then(() => {
            console.log('DESTROYED Task');
            res.redirect('/task');
        })
        .catch(err => {
            console.log(err);
            // Handle error
        });
}

/**
 * Renders the edit task view for a specific task.
 * Fetches a task by ID and renders the task-detail view for editing.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getEditTask = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/task');
    }
    const taskId = req.params.taskId;
    Task.findById(taskId)
        .then(task => {
            if (!task) {
                return res.redirect('/task');
            }
            res.render('task-detail', {
                editing: editMode,
                task: task
            });
        })
        .catch(err => {
            console.log(err);
            // Handle error
        });
}

/**
 * Updates a task in the database with new information.
 * Redirects to the '/task' route after updating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.postEditTask = (req, res, next) => {
    const taskId = req.body.taskId;
    const name = req.body.name;
    const checked = req.body.checked;
    const dueDate = req.body.dueDate;
    const task = new Task(name, checked, dueDate, taskId);

    task.save()
        .then(result => {
            console.log('UPDATED Task!');
            res.redirect('/task');
        })
        .catch(err => {
            console.log(err);
            // Handle error
        });
}

/**
 * Renders the add task view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.getAddTask = (req, res, next) => {
    res.render('task-detail');
}

/**
 * Creates a new task and saves it to the database.
 * Redirects to the '/task' route after creating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.postAddTask = (req, res, next) => {
    const name = req.body.name;
    const checked = req.body.checked;
    const dueDate = req.body.dueDate;
    const task = new Task(name, checked, dueDate);

    task.save()
        .then(result => {
            console.log('Created Task');
            res.redirect('/task');
        })
        .catch(err => {
            console.log(err);
            // Handle error
        });
}
