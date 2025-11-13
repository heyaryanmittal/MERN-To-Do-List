import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import TodoList from './components/TodoList';

function AppContent() {
  const { user, loading } = useAuth();

  // Apply theme class to the root element
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (user) {
      root.classList.remove('light', 'dark');
      root.classList.add(user.theme_mode);
    } else {
      // Default to light theme if not logged in
      root.classList.remove('light', 'dark');
      root.classList.add('light');
    }
  }, [user?.theme_mode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-xl text-gray-700 dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  return user ? <TodoList /> : <LandingPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
