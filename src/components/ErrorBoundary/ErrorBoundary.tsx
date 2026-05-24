import * as React from 'react';
import { TEXTS } from '../../shared/text';
import { buttonStyles } from '../../shared/styles/button';
import type { ErrorProps, ErrorState } from './errorBoundary.types';

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
        <p className="flex justify-center  gap-2 items-center mt-4">
          {this.state.error?.message ?? TEXTS.error.fallback}
          <button
            className={`${buttonStyles.base} ${buttonStyles.red}`}
            onClick={this.reset}
          >
            {TEXTS.error.retry}
          </button>
        </p>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
