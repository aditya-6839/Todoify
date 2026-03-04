import { useState, useEffect, useCallback } from 'react';
import * as projectApi from '@/api/projectApi';


export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await projectApi.getProjects();
            setProjects(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const createProject = async (data) => {
        const res = await projectApi.createProject(data);
        setProjects(prev => [res.data, ...prev]);
        return res.data;
    };

    const updateProject = async (id, data) => {
        const res = await projectApi.updateProject(id, data);
        setProjects(prev => prev.map(p => (p._id === id ? res.data : p)));
        return res.data;
    };

    const deleteProject = async (id) => {
        await projectApi.deleteProject(id);
        setProjects(prev => prev.filter(p => p._id !== id));
    };

    return {
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    };
}


export function useProject(id) {
    const [project, setProject] = useState(null);
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProject = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const res = await projectApi.getProject(id);
            setProject(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch project');
        } finally {
            setLoading(false);
        }
    }, [id]);

    const fetchProjectTodos = useCallback(async () => {
        if (!id) return;
        try {
            const res = await projectApi.getProjectTodos(id);
            setTodos(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch project todos');
        }
    }, [id]);

    useEffect(() => {
        fetchProject();
        fetchProjectTodos();
    }, [fetchProject, fetchProjectTodos]);

    // ── Members ──
    const removeMember = async (userId) => {
        const res = await projectApi.removeMember(id, userId);
        setProject(res.data);
        return res.data;
    };

    const updateMemberRole = async (userId, role) => {
        const res = await projectApi.updateMemberRole(id, userId, role);
        setProject(res.data);
        return res.data;
    };

    // ── Invite Links ──
    const generateInviteLink = async (expiryHours) => {
        const res = await projectApi.generateInviteLink(id, expiryHours);
        return res.data;
    };

    const regenerateInviteLink = async (expiryHours) => {
        const res = await projectApi.regenerateInviteLink(id, expiryHours);
        return res.data;
    };

    const revokeInviteLink = async () => {
        await projectApi.revokeInviteLink(id);
    };

    return {
        project,
        todos,
        loading,
        error,
        refetch: fetchProject,
        refetchTodos: fetchProjectTodos,
        removeMember,
        updateMemberRole,
        generateInviteLink,
        regenerateInviteLink,
        revokeInviteLink,
    };
}


export function useJoinProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const joinProject = async (token) => {
        try {
            setLoading(true);
            setError(null);
            const res = await projectApi.joinViaInvite(token);
            return res.data;
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to join project');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { joinProject, loading, error };
}
