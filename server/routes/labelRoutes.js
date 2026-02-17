import express from 'express';
import {
    getLabels,
    getLabel,
    createLabel,
    updateLabel,
    deleteLabel,
} from '../controllers/labelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getLabels).post(createLabel);

router.route('/:id').get(getLabel).put(updateLabel).delete(deleteLabel);

export default router;
