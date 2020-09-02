import * as React from "react";
import Error from "../error/error";

type Props = {
  children: React.ReactNode;
}

type State = {
  hasError: boolean;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
      errorInfo,
    });
  }

  render() {
    let content;
    const {
      hasError,
      errorInfo,
    } = this.state;
    const {
      children
    } = this.props;

    if (hasError) {
      content = <Error text={errorInfo}/>;
    } else {
      content = children;
    }

    return (
      <>
        {content}
      </>
    );
  }
}
