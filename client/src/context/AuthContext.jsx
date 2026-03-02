import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true while checking session
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


    const login = async ({ email, password }) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.success) {
            setUser(data.data);
            return true;
        }
        return false;
    };

    // Popup errors that mean "user dismissed" — not real failures.
    // Catching them here ensures the caller's finally{} always runs
    // and the loading spinner is never left spinning indefinitely.
    const POPUP_DISMISSED = new Set([
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
        'auth/popup-blocked',
    ]);

    // Opens Firebase Google popup -> sends uid/email/name/avatar to backend.
    // Backend creates or links the account and issues a session cookie.
    const googleLogin = async () => {
        const { signInWithGoogle } = await import('@/lib/firebase');

        let result;
        try {
            result = await signInWithGoogle();
        } catch (err) {
            if (POPUP_DISMISSED.has(err?.code)) {
                // User closed / dismissed the popup — silently bail out
                return false;
            }
            throw err; // Re-throw genuine errors (network, bad config, etc.)
        }

        const firebaseUser = result.user;

        const { data } = await api.post('/auth/google', {
            googleId: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
        });

        if (data.success) {
            setUser(data.data);
            return true;
        }
        return false;
    };


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
        <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};
