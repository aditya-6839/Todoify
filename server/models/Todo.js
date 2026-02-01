import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        dueDate: {
            type: Date,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // Phase 2: Project Management
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },
        // Phase 2: Task Assignment
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        // Phase 2: Labels & Categories
        labels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Label',
            },
        ],
        // Comments for collaboration
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                text: {
                    type: String,
                    required: [true, 'Comment text is required'],
                    trim: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Virtual property to check if todo is overdue
todoSchema.virtual('isOverdue').get(function () {
    // If no due date, it can't be overdue
    if (!this.dueDate) return false;

    // If already completed, it's not overdue
    if (this.completed) return false;

    // Check if due date has passed
    return new Date() > new Date(this.dueDate);
});

// Ensure virtuals are included when converting to JSON
todoSchema.set('toJSON', { virtuals: true });
todoSchema.set('toObject', { virtuals: true });

// Indexes for optimized queries
todoSchema.index({ user: 1 });
todoSchema.index({ project: 1 });
todoSchema.index({ completed: 1 });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ user: 1, completed: 1 });
todoSchema.index({ project: 1, assignedTo: 1 });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
