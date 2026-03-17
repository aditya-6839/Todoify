import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as todoApi from '@/api/todoApi';

const AddTaskContext = createContext(null);

export const AddTaskProvider = ({ children }) => {
    // ── Dialog state ─────────────────────────────────
    const [open, setOpen] = useState(false);

    // ── Shared todos state (single source of truth) ──
    const [todos, setTodos] = useState([]);
    const [todosLoading, setTodosLoading] = useState(true);
    const [todosError, setTodosError] = useState(null);

    const fetchTodos = useCallback(async () => {
        try {
            setTodosLoading(true);
            setTodosError(null);
            const res = await todoApi.getTodos();
            setTodos(res.data);
        } catch (err) {
            setTodosError(err?.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setTodosLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    // Add a new todo and immediately prepend it to the list (no refetch needed)
    const createTodo = async (data) => {
        const res = await todoApi.createTodo(data);
        setTodos(prev => [res.data, ...prev]);
        return res.data;
    };

    // Toggle a todo's completed state
    const toggleTodo = async (id) => {
        const res = await todoApi.toggleTodo(id);
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
        return res.data;
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        await todoApi.deleteTodo(id);
        setTodos(prev => prev.filter(t => t._id !== id));
    };

    // Update a todo
    const updateTodo = async (id, data) => {
        const res = await todoApi.updateTodo(id, data);
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
        return res.data;
    };

    // Add a comment to a todo
    const addComment = async (id, text) => {
        const res = await todoApi.addComment(id, text);
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
        return res.data;
    };

    // Delete a comment from a todo
    const deleteComment = async (todoId, commentId) => {
        const res = await todoApi.deleteComment(todoId, commentId);
        setTodos(prev => prev.map(t => (t._id === todoId ? res.data : t)));
        return res.data;
    };

    return (
        <AddTaskContext.Provider value={{
            // dialog
            open, setOpen,
            // todos
            todos, todosLoading, todosError,
            fetchTodos, createTodo, toggleTodo, deleteTodo,
            updateTodo, addComment, deleteComment,
        }}>
            {children}
        </AddTaskContext.Provider>
    );
};

export const useAddTask = () => {
    const ctx = useContext(AddTaskContext);
    if (!ctx) throw new Error('useAddTask must be used inside <AddTaskProvider>');
    return ctx;
};
