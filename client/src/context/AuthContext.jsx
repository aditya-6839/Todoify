import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

// ─── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ───────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while checking session

    // ── Restore session on mount ────────────────────────────────────────────
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await api.get('/auth/me');
                if (data.success) setUser(data.data);
            } catch {
                setUser(null); // no valid session
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    // ── Register ────────────────────────────────────────────────────────────
    const register = async ({ name, email, password }) => {
        const { data } = await api.post('/auth/register', { name, email, password });
        if (data.success) {
            // Cookie is set by the server; sync React state so the user is
            // immediately authenticated without needing to hit /auth/me again.
            setUser(data.data);
            return true;
        }
        return false;
    };

    // ── Login ───────────────────────────────────────────────────────────────
    const login = async ({ email, password }) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.success) {
            setUser(data.data);
            return true;
        }
        return false;
    };

    // ── Logout ──────────────────────────────────────────────────────────────
    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // even if request fails, clear local state

        } finally {
            setUser(null);
            toast.success('Logged out successfully');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
