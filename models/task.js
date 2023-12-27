import mongodb from 'mongodb'
import { getDb  } from '../util/database.js';
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
  async save() {
    try {
      const db = getDb();
      let dbOp;
      if (this._id) {
        dbOp = await db.collection('task').updateOne({ _id: this._id }, { $set: this });
      } else {
        dbOp = await db.collection('task').insertOne(this);
      }
      console.log(dbOp);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Fetches all tasks from the MongoDB database.
   * @returns {Promise} A promise that resolves to an array of tasks.
   */
  static async fetchAll() {
    try {
      const db = getDb();
      const tasks = await db.collection('task').find().toArray();
      return tasks;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Finds a task by its ID in the MongoDB database.
   * @param {string} taskId - ID of the task to find.
   * @returns {Promise} A promise that resolves to the found task or null if not found.
   */
  static async findById(taskId) {
    try {
      const db = getDb();
      const task = await db.collection('task').find({ _id: new mongodb.ObjectId(taskId) }).next();
      console.log(task);
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Deletes a task by its ID from the MongoDB database.
   * @param {string} taskId - ID of the task to delete.
   * @returns {Promise} A promise that resolves when the task is successfully deleted.
   */
  static async deleteById(taskId) {
    try {
      const db = getDb();
      await db.collection('task').deleteOne({ _id: new mongodb.ObjectId(taskId) });
      console.log('Deleted');
    } catch (err) {
      console.log(err);
    }
  }
}

export default Task
