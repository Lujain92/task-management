express = require('express');

taskControllers = require('../controllers/task')

const router = express.Router();

router.get('/',taskControllers.getTasks)

router.get('/task',taskControllers.getTask)

router.get('/create',taskControllers.getAddTask)

router.post('/create',taskControllers.postAddTask)

router.post('/delete',taskControllers.deleteTask)

router.get('/edit/:taskId',taskControllers.getEditTask)

router.post('/edit/',taskControllers.postEditTask)

module.exports = router;
