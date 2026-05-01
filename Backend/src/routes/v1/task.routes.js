import express from 'express';
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    getAllTasks,
} from '../../controllers/task.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createTask)
    .get(protect, getTasks);

router.get('/all', protect, authorize('admin'), getAllTasks);

router.route('/:id')
    .get(protect, getTask)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;
