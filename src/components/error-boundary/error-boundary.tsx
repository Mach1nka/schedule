import * as React from "react";
import Error from "../error/error";

type Props = {
  children: React.ReactNode;
}

type State = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const {
      error,
      errorInfo,
    } = this.state;
    const {
      children
    } = this.props;

    return error
      ? <Error
        error={error?.toString()}
        componentStack={errorInfo?.componentStack}
        />
      : children;
  }
}
