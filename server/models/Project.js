import mongoose from 'mongoose';

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
                    enum: ['admin', 'member'],
                    default: 'member',
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        // Permissions: Control what members can do
        permissions: {
            membersCanCreateTodos: {
                type: Boolean,
                default: true, // By default, members can create todos
            },
        },
        color: {
            type: String,
            default: '#3B82F6', // Default blue color
            match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        },
    },
    {
        timestamps: true,
    }
);

// Index for optimized queries
projectSchema.index({ 'members.user': 1 });

// Virtual to get task count for this project
projectSchema.virtual('taskCount', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'project',
    count: true,
});

// Helper method to get the admin(s) of the project
projectSchema.methods.getAdmins = function () {
    return this.members
        .filter(member => member.role === 'admin')
        .map(member => member.user);
};

// Helper method to check if user is project admin
projectSchema.methods.isAdmin = function (userId) {
    return this.members.some(
        member => member.role === 'admin' && member.user.toString() === userId.toString()
    );
};

// Helper method to check if user is project member (admin or member)
projectSchema.methods.isMember = function (userId) {
    return this.members.some(
        member => member.user.toString() === userId.toString()
    );
};

// Helper method to get user's role in project
projectSchema.methods.getUserRole = function (userId) {
    const member = this.members.find(
        member => member.user.toString() === userId.toString()
    );
    return member ? member.role : null;
};

// Helper method to check if user can create todos in this project
projectSchema.methods.canCreateTodos = function (userId) {
    const member = this.members.find(
        member => member.user.toString() === userId.toString()
    );

    if (!member) return false; // Not a member
    if (member.role === 'admin') return true; // Admins can always create

    // Members can create only if permission is enabled
    return this.permissions.membersCanCreateTodos;
};

const Project = mongoose.model('Project', projectSchema);

export default Project;
