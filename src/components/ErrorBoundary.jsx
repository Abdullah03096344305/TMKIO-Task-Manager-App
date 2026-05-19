'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0f1117] p-4">
          <div className="max-w-md w-full bg-[#181b2a] border border-rose-500/30 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/40 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-white mb-2">
              Something went wrong
            </h1>

            <p className="text-sm text-slate-400 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
                  Error Details
                </summary>
                <pre className="mt-2 p-3 bg-slate-900/50 rounded text-xs text-slate-300 overflow-auto max-h-40">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
