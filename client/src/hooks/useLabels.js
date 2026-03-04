import { useState, useEffect, useCallback } from 'react';
import * as labelApi from '@/api/labelApi';

export function useLabels() {
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLabels = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await labelApi.getLabels();
            setLabels(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch labels');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLabels();
    }, [fetchLabels]);

    const createLabel = async (data) => {
        const res = await labelApi.createLabel(data);
        setLabels(prev => [res.data, ...prev]);
        return res.data;
    };

    const updateLabel = async (id, data) => {
        const res = await labelApi.updateLabel(id, data);
        setLabels(prev => prev.map(l => (l._id === id ? res.data : l)));
        return res.data;
    };

    const deleteLabel = async (id) => {
        await labelApi.deleteLabel(id);
        setLabels(prev => prev.filter(l => l._id !== id));
    };

    return {
        labels,
        loading,
        error,
        fetchLabels,
        createLabel,
        updateLabel,
        deleteLabel,
    };
}
