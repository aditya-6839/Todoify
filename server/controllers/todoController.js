import Todo from '../models/Todo.js';
import Project from '../models/Project.js';

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req, res, next) => {
    try {
        const {
            search,
            priority,
            status,
            project,
            labels,
            sort,
        } = req.query;

        // Base query - only get todos for current user
        let query = { user: req.user._id };

        // Search in title and description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by priority
        if (priority) {
            query.priority = priority;
        }

        // Filter by status (completed)
        if (status) {
            query.completed = status === 'completed';
        }

        // Filter by project
        if (project) {
            query.project = project;
        }

        // Filter by labels (can be comma separated)
        if (labels) {
            const labelIds = labels.split(',');
            query.labels = { $in: labelIds };
        }

        // Sorting
        let sortOption = { createdAt: -1 }; // Default sort
        if (sort) {
            const sortFields = sort.split(',').join(' ');
            sortOption = sortFields;
        }

        // Execute query
        const todos = await Todo.find(query)
            .sort(sortOption)
            .populate('project', 'name color members')
            .populate('labels', 'name color')
            .populate('assignedTo', 'name email avatar');

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
export const getTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
            .populate('project', 'name color members')
            .populate('labels', 'name color')
            .populate('assignedTo', 'name email avatar')
            .populate('comments.user', 'name email avatar');

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Make sure user owns todo OR is a project member if it belongs to a project
        let authorized = todo.user.toString() === req.user._id.toString();

        if (!authorized && todo.project) {
            // Find project to check members
            const project = await Project.findById(todo.project);
            if (project && project.isMember(req.user._id)) {
                authorized = true;
            }
        }

        if (!authorized) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this todo',
            });
        }

        res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user._id;

        const todo = await Todo.create(req.body);

        res.status(201).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);

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

        todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (req, res, next) => {
    try {
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
                message: 'Not authorized to delete this todo',
            });
        }

        await todo.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
// @access  Private
export const toggleTodo = async (req, res, next) => {
    try {
        let todo = await Todo.findById(req.params.id);

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

        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Assign todo to a project member
// @route   PUT /api/todos/:id/assign
// @access  Private
export const assignTodo = async (req, res, next) => {
    try {
        const { assignedTo } = req.body;

        if (!assignedTo) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a user ID to assign',
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
                message: 'Not authorized to assign this todo',
            });
        }

        // If todo belongs to a project, verify assignedTo user is a member
        if (todo.project) {
            const project = await Project.findById(todo.project);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found',
                });
            }

            // Check if assignedTo user is a member of the project
            if (!project.isMember(assignedTo)) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot assign todo to a user who is not a project member',
                });
            }
        }

        todo.assignedTo = assignedTo;
        await todo.save();

        await todo.populate('assignedTo', 'name email avatar');

        res.status(200).json({
            success: true,
            message: 'Todo assigned successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Unassign todo (remove assignment)
// @route   DELETE /api/todos/:id/assign
// @access  Private
export const unassignTodo = async (req, res, next) => {
    try {
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
                message: 'Not authorized to unassign this todo',
            });
        }

        if (!todo.assignedTo) {
            return res.status(400).json({
                success: false,
                message: 'Todo is not assigned to anyone',
            });
        }

        todo.assignedTo = null;
        await todo.save();

        res.status(200).json({
            success: true,
            message: 'Todo unassigned successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add comment to todo
// @route   POST /api/todos/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please provide comment text',
            });
        }

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // User must be the owner or (if project todo) a project member
        let canComment = todo.user.toString() === req.user._id.toString();

        if (!canComment && todo.project) {
            const project = await Project.findById(todo.project);
            if (project && project.isMember(req.user._id)) {
                canComment = true;
            }
        }

        if (!canComment) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to comment on this todo',
            });
        }

        // Add comment
        todo.comments.push({
            user: req.user._id,
            text: text.trim(),
        });

        await todo.save();
        await todo.populate('comments.user', 'name email avatar');

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete comment from todo
// @route   DELETE /api/todos/:id/comments/:commentId
// @access  Private
export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Find the comment
        const comment = todo.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // Only comment owner or todo owner can delete
        const isCommentOwner = comment.user.toString() === req.user._id.toString();
        const isTodoOwner = todo.user.toString() === req.user._id.toString();

        if (!isCommentOwner && !isTodoOwner) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this comment',
            });
        }

        // Remove comment
        comment.deleteOne();
        await todo.save();

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Edit comment on todo
// @route   PUT /api/todos/:id/comments/:commentId
// @access  Private
export const editComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Please provide comment text',
            });
        }

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Find the comment
        const comment = todo.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // Only comment owner can edit their comment
        const isCommentOwner = comment.user.toString() === req.user._id.toString();

        if (!isCommentOwner) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to edit this comment',
            });
        }

        // Update comment text
        comment.text = text.trim();
        await todo.save();

        await todo.populate('comments.user', 'name email avatar');

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};
