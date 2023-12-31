import { ObjectId } from 'mongodb';
import collections from '../util/data/collections.js';
import { getCollection } from '../util/database.js';

class Task {
    /**
     * Represents a task object.
     * @param {string} name - Name of the task.
     * @param {boolean} checked - Status of the task (checked or unchecked).
     * @param {Date} dueDate - Due date of the task.
     * @param {string} [taskId] - Optional task ID if editing an existing task.
     */
    constructor(name, checked, dueDate, taskId, overDue) {
        this.name = name;
        this.checked = checked;
        this.dueDate = dueDate;
        this._id = taskId ? new ObjectId(taskId) : null;
        this.overDue = overDue;
    }

    /**
     * Saves the current task instance to the MongoDB database.
     * @returns {Promise} A promise that resolves to the MongoDB `insertOne` or `updateOne` result.
     */
    async save() {
        try {
            getCollection(collections.taskCollection).createIndex(
                { name: 1 },
                { unique: true },
            );

            this._id
                ? getCollection(collections.taskCollection).updateOne(
                      { _id: this._id },
                      { $set: this },
                  )
                : await getCollection(collections.taskCollection).insertOne(
                      this,
                  );
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Fetches all tasks from the MongoDB database.
     * @returns {Promise} A promise that resolves to an array of tasks.
     */
    static async fetchAll() {
        try {
            const tasks = await getCollection(collections.taskCollection)
                .find()
                .toArray();
            return tasks;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Finds a task by its ID in the MongoDB database.
     * @param {string} taskId - ID of the task to find.
     * @returns {Promise} A promise that resolves to the found task or null if not found.
     */
    static async findById(taskId) {
        try {
            const task = await getCollection(collections.taskCollection)
                .find({ _id: new ObjectId(taskId) })
                .next();
            return task;
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Deletes a task by its ID from the MongoDB database.
     * @param {string} taskId - ID of the task to delete.
     * @returns {Promise} A promise that resolves when the task is successfully deleted.
     */
    static async deleteById(taskId) {
        try {
            await getCollection(collections.taskCollection).deleteOne({
                _id: new ObjectId(taskId),
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export default Task;
