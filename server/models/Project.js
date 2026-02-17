import mongoose from 'mongoose';
import crypto from 'crypto';

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a project name'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                role: {
                    type: String,
                    enum: ['owner', 'admin', 'member'],
                    default: 'member',
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        color: {
            type: String,
            default: '#3B82F6',
            match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
        },
        // Permissions: Control what members can do
        permissions: {
            membersCanCreateTodos: {
                type: Boolean,
                default: true, // By default, members can create todos
            },
        },
        // Project lifecycle status
        status: {
            type: String,
            enum: ['active', 'on-hold', 'completed', 'archived'],
            default: 'active',
        },
        // Project importance level
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        // Project category/type
        category: {
            type: String,
            enum: ['work', 'personal', 'education', 'health', 'finance', 'other'],
            default: 'other',
        },
        // Project deadline
        deadline: {
            type: Date,
            default: null,
        },
        // Invite link system for adding members
        inviteToken: {
            type: String,
            unique: true,
            sparse: true, // Allows null values while maintaining uniqueness
        },
        inviteTokenExpiry: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for optimized queries
projectSchema.index({ 'members.user': 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ deadline: 1 });

// Virtual to get task count for this project
projectSchema.virtual('taskCount', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'project',
    count: true,
});

// Helper method to get the owner(s) of the project
projectSchema.methods.getOwner = function () {
    const owner = this.members.find(member => member.role === 'owner');
    return owner ? owner.user : null;
};

// Helper method to check if user is the owner
projectSchema.methods.isOwner = function (userId) {
    const ownerId = this.getOwner();
    return ownerId && ownerId.toString() === userId.toString();
};

// Helper method to get the admin(s) of the project (includes owner)
projectSchema.methods.getAdmins = function () {
    return this.members
        .filter(member => member.role === 'admin' || member.role === 'owner')
        .map(member => member.user);
};

// Helper method to check if user is project admin (includes owner)
projectSchema.methods.isAdmin = function (userId) {
    return this.members.some(member => {
        // Handle both populated and non-populated user references
        const memberId = member.user._id ? member.user._id.toString() : member.user.toString();
        return (member.role === 'admin' || member.role === 'owner') && memberId === userId.toString();
    });
};

// Helper method to check if user is project member (admin or member)
projectSchema.methods.isMember = function (userId) {
    return this.members.some(member => {
        // Handle both populated and non-populated user references
        const memberId = member.user._id ? member.user._id.toString() : member.user.toString();
        return memberId === userId.toString();
    });
};

// Helper method to get user's role in project
projectSchema.methods.getUserRole = function (userId) {
    const member = this.members.find(member => {
        // Handle both populated and non-populated user references
        const memberId = member.user._id ? member.user._id.toString() : member.user.toString();
        return memberId === userId.toString();
    });
    return member ? member.role : null;
};

// Helper method to check if user can create todos in this project
projectSchema.methods.canCreateTodos = function (userId) {
    const member = this.members.find(member => {
        // Handle both populated and non-populated user references
        const memberId = member.user._id ? member.user._id.toString() : member.user.toString();
        return memberId === userId.toString();
    });

    if (!member) return false; // Not a member
    if (member.role === 'admin' || member.role === 'owner') return true; // Admins/Owners can always create

    // Members can create only if permission is enabled
    return this.permissions.membersCanCreateTodos;
};

// Helper method to check if project is overdue
projectSchema.methods.isOverdue = function () {
    if (!this.deadline) return false;
    return new Date() > new Date(this.deadline) && this.status !== 'completed';
};

// Helper method to generate invite token
projectSchema.methods.generateInviteToken = function (expiryHours = 168) {
    // Generate a random token (using crypto for security)
    this.inviteToken = crypto.randomBytes(32).toString('hex');

    // Set expiry (default 7 days = 168 hours)
    this.inviteTokenExpiry = new Date(Date.now() + expiryHours * 60 * 60 * 1000);

    return this.inviteToken;
};

// Helper method to check if invite token is valid
projectSchema.methods.isInviteTokenValid = function () {
    if (!this.inviteToken || !this.inviteTokenExpiry) return false;
    return new Date() < new Date(this.inviteTokenExpiry);
};

// Helper method to clear invite token
projectSchema.methods.clearInviteToken = function () {
    this.inviteToken = null;
    this.inviteTokenExpiry = null;
};

// Ensure virtuals are included when converting to JSON
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;
