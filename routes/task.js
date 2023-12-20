const express = require('express');

const taskControllers = require('../controllers/task')

const router = express.Router();

router.get('/',taskControllers.getTasks)

router.get('/create',taskControllers.getAddTask)

router.post('/create',taskControllers.postAddTask)

router.post('/delete',taskControllers.deleteTask)

router.get('/edit/:taskId',taskControllers.getEditTask)

router.post('/edit',taskControllers.postEditTask)

router.get('/:taskId',taskControllers.getTask)

module.exports = router;
