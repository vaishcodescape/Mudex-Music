import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-sky-300 mb-4">Something went wrong</h1>
            <button
              className="px-4 py-2 bg-sky-500 text-white rounded-full"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))

// Add error logging
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error caught:', { message, source, lineno, colno, error })
}

// Render with error boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
