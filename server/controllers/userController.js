import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile (name, email, avatar)
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use',
                });
            }
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (avatar !== undefined) user.avatar = avatar;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                authProvider: updatedUser.authProvider,
            },
            message: 'Profile updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Change user password
// @route   PUT /api/users/password
// @access  Private
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide current password and new password',
            });
        }

        // Validate new password length
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 8 characters',
            });
        }

        // Get user with password field
        const user = await User.findById(req.user._id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if user is using Google auth
        if (user.authProvider === 'google' && !user.password) {
            return res.status(400).json({
                success: false,
                message: 'Cannot change password for Google authenticated accounts',
            });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect',
            });
        }

        // Update password (will be hashed by pre-save middleware)
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user avatar
// @route   PUT /api/users/avatar
// @access  Private
export const updateAvatar = async (req, res, next) => {
    try {
        const { avatar } = req.body;

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an avatar URL',
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        user.avatar = avatar;
        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: {
                avatar: updatedUser.avatar,
            },
            message: 'Avatar updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove user avatar
// @route   DELETE /api/users/avatar
// @access  Private
export const removeAvatar = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        user.avatar = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Avatar removed successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
export const deleteAccount = async (req, res, next) => {
    try {
        const { password } = req.body;

        const user = await User.findById(req.user._id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // If local auth, verify password
        if (user.authProvider === 'local') {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide your password to delete account',
                });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Incorrect password',
                });
            }
        }

        // Delete user
        await User.findByIdAndDelete(req.user._id);

        // Clear cookie
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Import Todo model (make sure it exists)
        const Todo = (await import('../models/Todo.js')).default;

        // Get todo statistics
        const totalTodos = await Todo.countDocuments({ user: userId });
        const completedTodos = await Todo.countDocuments({
            user: userId,
            completed: true,
        });
        const pendingTodos = await Todo.countDocuments({
            user: userId,
            completed: false,
        });

        // Get priority breakdown
        const highPriority = await Todo.countDocuments({
            user: userId,
            priority: 'high',
            completed: false,
        });
        const mediumPriority = await Todo.countDocuments({
            user: userId,
            priority: 'medium',
            completed: false,
        });
        const lowPriority = await Todo.countDocuments({
            user: userId,
            priority: 'low',
            completed: false,
        });

        // Get overdue tasks (if dueDate is in the past and not completed)
        const overdueTodos = await Todo.countDocuments({
            user: userId,
            completed: false,
            dueDate: { $lt: new Date() },
        });

        // Get upcoming tasks (due within next 7 days)
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const upcomingTodos = await Todo.countDocuments({
            user: userId,
            completed: false,
            dueDate: { $gte: new Date(), $lte: nextWeek },
        });

        res.status(200).json({
            success: true,
            data: {
                total: totalTodos,
                completed: completedTodos,
                pending: pendingTodos,
                completionRate:
                    totalTodos > 0
                        ? Math.round((completedTodos / totalTodos) * 100)
                        : 0,
                byPriority: {
                    high: highPriority,
                    medium: mediumPriority,
                    low: lowPriority,
                },
                overdue: overdueTodos,
                upcoming: upcomingTodos,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users (Admin only - for future use)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user by ID (Admin only - for future use)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};
