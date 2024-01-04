
import Task from '../models/task.js';
import * as dotenv from 'dotenv';
import  { mongoConnect } from '../util/database.js';

dotenv.config();
await mongoConnect();

process.on('message', async (message) => {
    const status = checkStatus().checkStatus;
    status && await updateOverdueTasks(message);
    process.exit(1);
});

/**
 * Retrieves the status from environment variables.
 * @returns {{checkStatus: string}} The status object containing the checkStatus value.
 */
const checkStatus = () => {
    return { checkStatus: process.env.checkStatus };
};


/**
 * Updates overdue tasks based on the received message.
 * @param {{tasks: Array}} message The message containing tasks array.
 * @returns {Promise<string>} A Promise that resolves to 'done' after tasks update.
 */
const updateOverdueTasks = async (message) => {
    for (const task of message.tasks) {
        if (task.checked === null && new Date(task.dueDate) < new Date()) {
            const updatedTask = new Task(task.name, task.checked, task.dueDate, task._id, true);
            await updatedTask.save();
        }
    }
    return 'done';
};
