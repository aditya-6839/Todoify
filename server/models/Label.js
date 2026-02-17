import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a label name'],
            trim: true,
        },
        color: {
            type: String,
            required: [true, 'Please provide a color'],
            match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            default: '#3B82F6',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for optimized queries
labelSchema.index({ user: 1 });
labelSchema.index({ project: 1 });
// Compound unique index: Each user can't have duplicate label names
labelSchema.index({ user: 1, name: 1 }, { unique: true });

// Virtual to get task count for this label
labelSchema.virtual('taskCount', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'labels',
    count: true,
});

const Label = mongoose.model('Label', labelSchema);

export default Label;
