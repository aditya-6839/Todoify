import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * Wrap any route that requires a logged-in user.
 * Redirects to /app/login and preserves the intended path via `state`.
 */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground font-medium">Loading…</p>
                </div>
            </div>
        );
    }

    if (!user) {
        // preserve where user was trying to go
        return <Navigate to="/app/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
