import Task from '../models/task.model.js';
import Joi from 'joi';

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
});

export const createTask = async (req, res, next) => {
    try {
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.details[0].message });
        }

        req.body.user = req.user.id;
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to access this task' });
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to update this task' });
        }

        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.details[0].message });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this task' });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        next(err);
    }
};

// Admin only routes
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().populate('user', 'username email');
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (err) {
        next(err);
    }
};
