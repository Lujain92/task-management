
import Task from '../models/task.js'
import * as dotenv from 'dotenv';
import * as dbb from '../util/database.js'

dotenv.config();

console.log('child created', process.pid)
process.on('message', (message) => {
    console.log('message', message);
    updateOverdueTasksQ(message)
//    console.log('update', updateOverdueTasksQ(message))
    process.exit(1);
})

const checkStatus = () => {
    return { checkStatus: process.env.checkStatus }
}

console.log(checkStatus())

const updateOverdueTasks = (message) => {
    let updatedTasks = message.tasks.map( task => {
        if (task.checked ===  null && new Date(task.dueDate) < new Date()){
            return {
                ...task,
                overDue: true
            }
        }
        return task
    })
    return updatedTasks
}

const updateOverdueTasksQ = (message) => {
     message.tasks.forEach( async task => {
         if (task.checked ===  null && new Date(task.dueDate) < new Date()){
            console.log('ener')
            const updatedTask = new Task(task.name, task.checked, task.dueDate, task._id, true);
                const dbOp = await dbb.test(task);
                console.log('aaaa',dbOp);
            //   await updatedTask.save();

        }
    })
    return 'done'
}
