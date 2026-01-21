<<<<<<< HEAD
"use client";

import React, { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { logger } from "@/lib/logger";
=======
'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { logger } from '@/lib/logger';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Use structured logger instead of console.error
<<<<<<< HEAD
    logger.error("React Error Boundary caught error", error, {
=======
    logger.error('React Error Boundary caught error', error, {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-spotify-dark text-white flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-spotify-text-gray mb-6">
<<<<<<< HEAD
              {this.state.error?.message ||
                "An unexpected error occurred. Please try again."}
=======
              {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-spotify-green text-black rounded-full font-semibold hover:scale-105 transition-transform mx-auto"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export default ErrorBoundary;
