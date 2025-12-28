const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const taskController = require('./../controllers/taskController');
router.use(authController.protect);

router.post('/', taskController.createTask)
      .get('/', taskController.getTasks);

router.get('/:id', taskController.getTask)
      .patch('/:id', taskController.updateTask)
      .delete('/:id', taskController.deleteTask);

module.exports = router;