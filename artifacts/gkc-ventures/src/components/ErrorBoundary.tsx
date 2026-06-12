import React, { ReactNode, ErrorInfo } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'wouter';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log to external error tracking service (e.g., Sentry) if available
    if (window.__ERROR_TRACKING__) {
      window.__ERROR_TRACKING__.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const [, navigate] = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            We encountered an unexpected error. Please try again or return home.
          </p>

          {error && (
            <details className="mb-6 p-3 bg-muted rounded text-sm">
              <summary className="cursor-pointer font-semibold text-foreground mb-2">
                Error Details
              </summary>
              <p className="text-muted-foreground font-mono text-xs break-words">
                {error.message}
              </p>
            </details>
          )}

          <div className="space-y-3">
            <button
              onClick={onReset}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __ERROR_TRACKING__?: {
      captureException: (error: Error, context?: any) => void;
    };
  }
}
