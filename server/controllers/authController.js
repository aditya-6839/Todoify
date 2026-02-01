import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password',
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};


// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Google OAuth Login/Register
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res, next) => {
    try {
        const { googleId, email, name, avatar } = req.body;

        // Validate required fields
        if (!googleId || !email) {
            return res.status(400).json({
                success: false,
                message: 'Google ID and email are required',
            });
        }

        // Check if user exists with this Google ID
        let user = await User.findOne({ googleId });

        if (!user) {
            // Check if user exists with this email (might have registered with password before)
            user = await User.findOne({ email });

            if (user) {
                // User exists with email, link Google account
                user.googleId = googleId;
                user.authProvider = 'google';
                if (avatar) user.avatar = avatar;
                await user.save();
            } else {
                // Create new user with Google auth
                user = await User.create({
                    name,
                    email,
                    googleId,
                    authProvider: 'google',
                    avatar: avatar || null,
                    // No password needed for Google auth
                });
            }
        }

        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                authProvider: user.authProvider,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

