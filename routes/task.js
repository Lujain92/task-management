import express from 'express';

import { getTasks, getAddTask, postAddTask, deleteTask, getEditTask, postEditTask, getTask } from '../controllers/task.js';

const taskRoutes = express.Router();

taskRoutes.get('/',getTasks)

taskRoutes.get('/create',getAddTask)

taskRoutes.post('/create',postAddTask)

taskRoutes.post('/delete',deleteTask)

taskRoutes.get('/edit/:taskId',getEditTask)

taskRoutes.post('/edit',postEditTask)

taskRoutes.get('/:taskId',getTask)

export default taskRoutes;

