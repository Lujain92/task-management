import Task from '../models/task.js'

/**
 * Renders the tasks list view.
 * Fetches all tasks from the database and renders the tasks-list view with the fetched tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.fetchAll();
    console.log(tasks);
    res.render('tasks-list', {
      tasks: tasks,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

/**
 * Renders the tasks list view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
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
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

/**
 * Deletes a task by its ID from the database.
 * Redirects to the '/task' route after deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.body.taskId;
    await Task.deleteById(taskId);
    console.log('DESTROYED Task');
    res.redirect('/task');
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

/**
 * Renders the edit task view for a specific task.
 * Fetches a task by ID and renders the edit-task view for editing.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
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
    res.render('edit-task', {
      editing: editMode,
      task: task,
    });
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

/**
 * Updates a task in the database with new information.
 * Redirects to the '/task' route after updating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const postEditTask = async (req, res, next) => {
  try {
    const taskId = req.body.taskId;
    const name = req.body.name;
    const checked = req.body.checked;
    const dueDate = req.body.dueDate;
    const task = new Task(name, checked, dueDate, taskId);
    await task.save();
    console.log('UPDATED Task!');
    res.redirect('/task');
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

/**
 * Renders the add task view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAddTask = (req, res, next) => {
  res.render('edit-task');
};

/**
 * Creates a new task and saves it to the database.
 * Redirects to the '/task' route after creating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const postAddTask = async (req, res, next) => {
  try {
    const name = req.body.name;
    const checked = req.body.checked;
    const dueDate = req.body.dueDate;
    const task = new Task(name, checked, dueDate, null);
    await task.save();
    console.log('Created Task');
    res.redirect('/task');
  } catch (err) {
    console.log(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

export {
  getTasks,
  getTask,
  deleteTask,
  getEditTask,
  postEditTask,
  getAddTask,
  postAddTask,
};
