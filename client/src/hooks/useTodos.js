import { useState, useEffect, useCallback } from 'react';
import * as todoApi from '@/api/todoApi';

export function useTodos(filters = {}) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const res = await todoApi.getTodos(params || filters);
            setTodos(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch todos');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos(filters);
    }, []);

    const createTodo = async (data) => {
        const res = await todoApi.createTodo(data);
        setTodos(prev => [res.data, ...prev]);
        return res.data;
    };

    const updateTodo = async (id, data) => {
        const res = await todoApi.updateTodo(id, data);
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
        return res.data;
    };

    const deleteTodo = async (id) => {
        await todoApi.deleteTodo(id);
        setTodos(prev => prev.filter(t => t._id !== id));
    };

    const toggleTodo = async (id) => {
        const res = await todoApi.toggleTodo(id);
        setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));
        return res.data;
    };

    return {
        todos,
        loading,
        error,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
    };
}


export function useTodo(id) {
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodo = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const res = await todoApi.getTodo(id);
            setTodo(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch todo');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    // ── Assignment ──
    const assignTodo = async (assignedTo) => {
        const res = await todoApi.assignTodo(id, assignedTo);
        setTodo(res.data);
        return res.data;
    };

    const unassignTodo = async () => {
        const res = await todoApi.unassignTodo(id);
        setTodo(res.data);
        return res.data;
    };

    // ── Labels ──
    const addLabel = async (labelId) => {
        const res = await todoApi.addLabelToTodo(id, labelId);
        setTodo(res.data);
        return res.data;
    };

    const removeLabel = async (labelId) => {
        const res = await todoApi.removeLabelFromTodo(id, labelId);
        setTodo(res.data);
        return res.data;
    };

    // ── Comments ──
    const addComment = async (text) => {
        const res = await todoApi.addComment(id, text);
        setTodo(res.data);
        return res.data;
    };

    const editComment = async (commentId, text) => {
        const res = await todoApi.editComment(id, commentId, text);
        setTodo(res.data);
        return res.data;
    };

    const deleteComment = async (commentId) => {
        const res = await todoApi.deleteComment(id, commentId);
        setTodo(res.data);
        return res.data;
    };

    return {
        todo,
        loading,
        error,
        refetch: fetchTodo,
        assignTodo,
        unassignTodo,
        addLabel,
        removeLabel,
        addComment,
        editComment,
        deleteComment,
    };
}
