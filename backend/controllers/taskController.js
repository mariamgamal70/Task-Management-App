const Task = require('./../database/task.db');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createTask= catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, userId: req.user.id });
    res.status(201).json({
        status: 'success',
        data: {
            task
        } 
    });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: {
            tasks
        }
    });
});     
exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });   
    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }
    const { title, description, status } = req.body;
    await task.update({ title, description, status });
    res.status(200).json({
        status: 'success',
        data: {
            task
        }
    });
}
);
exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
        return next(new AppError('No task found with that ID', 404));
    }   
    await task.destroy();
    res.status(204).json({
        status: 'success',
        data: null
    });
});