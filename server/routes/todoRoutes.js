import express from 'express';
import {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    assignTodo,
    unassignTodo,
    addComment,
    editComment,
    deleteComment,
} from '../controllers/todoController.js';
import {
    addLabelToTodo,
    removeLabelFromTodo,
} from '../controllers/labelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

router.patch('/:id/toggle', toggleTodo);

// Assignment routes
router.put('/:id/assign', assignTodo);
router.delete('/:id/assign', unassignTodo);

// Label routes
router.post('/:id/labels', addLabelToTodo);
router.delete('/:id/labels/:labelId', removeLabelFromTodo);

// Comment routes
router.post('/:id/comments', addComment);
router.put('/:id/comments/:commentId', editComment);
router.delete('/:id/comments/:commentId', deleteComment);

export default router;
