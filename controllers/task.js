const Task = require('../models/task');

/**
 * Renders the tasks list view.
 * Fetches all tasks from the database and renders the tasks-list view with the fetched tasks.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getTasks = (req, res) => {
  Task.fetchAll()
    .then((tasks) => {
      console.log(tasks);
      res.render('tasks-list', {
        tasks: tasks,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Renders the tasks list view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getTask = (req, res) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.redirect('/task');
      }
      res.render('task-detail', {
        task: task,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Deletes a task by its ID from the database.
 * Redirects to the '/task' route after deletion.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteTask = (req, res) => {
  const taskId = req.body.taskId;
  Task.deleteById(taskId)
    .then(() => {
      console.log('DESTROYED Task');
      res.redirect('/task');
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Renders the edit task view for a specific task.
 * Fetches a task by ID and renders the edit-task view for editing.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getEditTask = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/task');
  }
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.redirect('/task');
      }
      res.render('edit-task', {
        editing: editMode,
        task: task,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Updates a task in the database with new information.
 * Redirects to the '/task' route after updating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.postEditTask = (req, res) => {
  const taskId = req.body.taskId;
  const name = req.body.name;
  const checked = req.body.checked;
  const dueDate = req.body.dueDate;
  const task = new Task(name, checked, dueDate, taskId);

  task
    .save()
    .then(() => {
      console.log('UPDATED Task!');
      res.redirect('/task');
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Renders the add task view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAddTask = (req, res) => {
  res.render('edit-task');
};

/**
 * Creates a new task and saves it to the database.
 * Redirects to the '/task' route after creating the task.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.postAddTask = (req, res) => {
  const name = req.body.name;
  const checked = req.body.checked;
  const dueDate = req.body.dueDate;
  const task = new Task(name, checked, dueDate, null);
  task
    .save()
    .then(() => {
      console.log('Created Task');
      res.redirect('/task');
    })
    .catch((err) => {
      console.log(err);
    });
};
