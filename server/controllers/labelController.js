import Label from '../models/Label.js';
import Todo from '../models/Todo.js';

// @desc    Get all labels for user
// @route   GET /api/labels
// @access  Private
export const getLabels = async (req, res, next) => {
    try {
        const labels = await Label.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: labels.length,
            data: labels,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single label
// @route   GET /api/labels/:id
// @access  Private
export const getLabel = async (req, res, next) => {
    try {
        const label = await Label.findById(req.params.id);

        if (!label) {
            return res.status(404).json({
                success: false,
                message: 'Label not found',
            });
        }

        // Make sure user owns label
        if (label.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this label',
            });
        }

        res.status(200).json({
            success: true,
            data: label,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new label
// @route   POST /api/labels
// @access  Private
export const createLabel = async (req, res, next) => {
    try {
        const { name, color, project } = req.body;

        // Check if label with same name already exists for this user
        const existingLabel = await Label.findOne({
            user: req.user._id,
            name: { $regex: new RegExp(`^${name}$`, 'i') }, // Case-insensitive
        });

        if (existingLabel) {
            return res.status(400).json({
                success: false,
                message: 'Label with this name already exists',
            });
        }

        // Add user to req.body
        req.body.user = req.user._id;

        const label = await Label.create(req.body);

        res.status(201).json({
            success: true,
            data: label,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update label
// @route   PUT /api/labels/:id
// @access  Private
export const updateLabel = async (req, res, next) => {
    try {
        let label = await Label.findById(req.params.id);

        if (!label) {
            return res.status(404).json({
                success: false,
                message: 'Label not found',
            });
        }

        // Make sure user owns label
        if (label.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this label',
            });
        }

        // If updating name, check for duplicates
        if (req.body.name && req.body.name !== label.name) {
            const existingLabel = await Label.findOne({
                user: req.user._id,
                name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
                _id: { $ne: req.params.id },
            });

            if (existingLabel) {
                return res.status(400).json({
                    success: false,
                    message: 'Label with this name already exists',
                });
            }
        }

        label = await Label.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: label,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete label
// @route   DELETE /api/labels/:id
// @access  Private
export const deleteLabel = async (req, res, next) => {
    try {
        const label = await Label.findById(req.params.id);

        if (!label) {
            return res.status(404).json({
                success: false,
                message: 'Label not found',
            });
        }

        // Make sure user owns label
        if (label.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this label',
            });
        }

        // Remove label from all todos that have it
        await Todo.updateMany(
            { labels: req.params.id },
            { $pull: { labels: req.params.id } }
        );

        await label.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Label deleted and removed from all todos',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add label to todo
// @route   POST /api/todos/:id/labels
// @access  Private
export const addLabelToTodo = async (req, res, next) => {
    try {
        const { labelId } = req.body;

        if (!labelId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a label ID',
            });
        }

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this todo',
            });
        }

        // Verify label exists and user owns it
        const label = await Label.findById(labelId);

        if (!label) {
            return res.status(404).json({
                success: false,
                message: 'Label not found',
            });
        }

        if (label.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to use this label',
            });
        }

        // Check if label already added
        if (todo.labels.includes(labelId)) {
            return res.status(400).json({
                success: false,
                message: 'Label already added to this todo',
            });
        }

        // Add label
        todo.labels.push(labelId);
        await todo.save();

        await todo.populate('labels', 'name color');

        res.status(200).json({
            success: true,
            message: 'Label added successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove label from todo
// @route   DELETE /api/todos/:id/labels/:labelId
// @access  Private
export const removeLabelFromTodo = async (req, res, next) => {
    try {
        const { labelId } = req.params;

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Make sure user owns todo
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this todo',
            });
        }

        // Check if label is attached
        if (!todo.labels.includes(labelId)) {
            return res.status(400).json({
                success: false,
                message: 'Label not attached to this todo',
            });
        }

        // Remove label
        todo.labels = todo.labels.filter(
            (label) => label.toString() !== labelId
        );
        await todo.save();

        await todo.populate('labels', 'name color');

        res.status(200).json({
            success: true,
            message: 'Label removed successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};
