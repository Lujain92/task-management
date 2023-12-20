const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Task {
  /**
   * Represents a task object.
   * @param {string} name - Name of the task.
   * @param {boolean} checked - Status of the task (checked or unchecked).
   * @param {Date} dueDate - Due date of the task.
   * @param {string} [taskId] - Optional task ID if editing an existing task.
   */
  constructor(name, checked, dueDate, taskId) {
    this.name = name;
    this.checked = checked;
    this.dueDate = dueDate;
    this._id = taskId ? new mongodb.ObjectId(taskId) : null;
  }

  /**
   * Saves the current task instance to the MongoDB database.
   * @returns {Promise} A promise that resolves to the MongoDB `insertOne` or `updateOne` result.
   */
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('task').updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('task').insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Fetches all tasks from the MongoDB database.
   * @returns {Promise} A promise that resolves to an array of tasks.
   */
  static fetchAll() {
    const db = getDb();
    return db
      .collection('task')
      .find()
      .toArray()
      .then((tasks) => {
        return tasks;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Finds a task by its ID in the MongoDB database.
   * @param {string} taskId - ID of the task to find.
   * @returns {Promise} A promise that resolves to the found task or null if not found.
   */
  static findById(taskId) {
    const db = getDb();
    return db
      .collection('task')
      .find({ _id: new mongodb.ObjectId(taskId) })
      .next()
      .then((task) => {
        console.log(task);
        return task;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Deletes a task by its ID from the MongoDB database.
   * @param {string} taskId - ID of the task to delete.
   * @returns {Promise} A promise that resolves when the task is successfully deleted.
   */
  static deleteById(taskId) {
    const db = getDb();
    return db
      .collection('task')
      .deleteOne({ _id: new mongodb.ObjectId(taskId) })
      .then(() => {
        console.log('Deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Task;
