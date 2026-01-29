import Todo from '../models/Todo.js';

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

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
