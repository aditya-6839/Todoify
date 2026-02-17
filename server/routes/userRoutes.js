import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    changePassword,
    updateAvatar,
    removeAvatar,
    deleteAccount,
    getUserStats,
    getAllUsers,
    getUserById,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

// All routes are protected (require authentication)

// Profile routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Password routes
router.put('/password', protect, changePassword);

// Avatar routes
router.route('/avatar').put(protect, updateAvatar).delete(protect, removeAvatar);

// Account deletion
router.delete('/account', protect, deleteAccount);

// User statistics
router.get('/stats', protect, getUserStats);

// Admin routes (require admin role)
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);

export default router;
