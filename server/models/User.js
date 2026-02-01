import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: function () {
                // Password only required for 'local' authentication
                return this.authProvider === 'local';
            },
            minlength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        avatar: {
            type: String,
            default: null,
        },
        // Authentication provider
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        // Google ID for OAuth users
        googleId: {
            type: String,
            default: null,
            sparse: true, // Allows multiple null values
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual to get user's projects
userSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'members.user',
});

const User = mongoose.model('User', userSchema);

export default User;
