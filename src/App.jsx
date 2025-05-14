import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-32 h-32 relative">
      <div className="absolute inset-0 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin"></div>
      <div className="absolute inset-3 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin-slow"></div>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-sky-400">Something went wrong</h1>
            <p className="text-sky-200 max-w-md mx-auto">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
