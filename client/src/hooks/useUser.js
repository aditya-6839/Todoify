import { useState, useEffect, useCallback } from 'react';
import * as userApi from '@/api/userApi';


export function useUserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await userApi.getUserProfile();
            setProfile(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const updateProfile = async (data) => {
        const res = await userApi.updateUserProfile(data);
        setProfile(prev => ({ ...prev, ...res.data }));
        return res.data;
    };

    const updateAvatar = async (avatarUrl) => {
        const res = await userApi.updateAvatar(avatarUrl);
        setProfile(prev => ({ ...prev, avatar: res.data.avatar }));
        return res.data;
    };

    const removeAvatar = async () => {
        await userApi.removeAvatar();
        setProfile(prev => ({ ...prev, avatar: null }));
    };

    const changePassword = async (currentPassword, newPassword) => {
        const res = await userApi.changePassword(currentPassword, newPassword);
        return res;
    };

    const deleteAccount = async (password) => {
        const res = await userApi.deleteAccount(password);
        return res;
    };

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
        updateAvatar,
        removeAvatar,
        changePassword,
        deleteAccount,
    };
}


export function useUserStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await userApi.getUserStats();
            setStats(res.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, error, refetch: fetchStats };
}
