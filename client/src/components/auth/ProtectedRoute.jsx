import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/app/AppLayout';
import LoadingScreen from '@/components/ui/LoadingScreen';

/**
 * Protects all /app/* routes.
 * - Shows branded loading screen while auth state is loading
 * - Redirects unauthenticated users to /app/login
 * - Renders the full AppLayout (sidebar + navbar) for authenticated users
 */
const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!user) {
        return <Navigate to="/app/login" state={{ from: location }} replace />;
    }

    return <AppLayout />;
};

export default ProtectedRoute;

