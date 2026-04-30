import * as React from 'react';
import { TEXTS } from '../shared/text';

type ErrorState = {
  hasError: boolean;
  error: Error | null;
};
type ErrorProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorState> {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    console.error('Caught by ErrorBoundary:', error);
  }
  reset() {
    this.setState({ hasError: false, error: null });
  }
  render() {
    if (this.state.hasError) {
      return (
        <p>
          {this.state.error?.message ?? TEXTS.error.fallback}{' '}
          <button onClick={this.reset}>{TEXTS.error.retry}</button>
        </p>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
