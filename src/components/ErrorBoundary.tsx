import * as React from 'react';
import * as Sentry from '@sentry/react';

import { Button } from './ui';

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      extra: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            We are already working on fixing the issue
          </p>
          <Button
            className="w-32"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
