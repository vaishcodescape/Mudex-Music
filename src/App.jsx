import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return children(user);
};

// Route wrapper components
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  return children;
};

// App component with route configuration
const App = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      {(user) => (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      )}
    </AuthProvider>
  );
};

// Root component with router
const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
