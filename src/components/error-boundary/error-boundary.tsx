import * as React from "react";
import Error from "../error/error";

type Props = {
  children: React.ReactNode;
}

type State = {
<<<<<<< HEAD
  hasError: boolean;
=======
  error: Error | null;
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      hasError: false,
=======
      error: null,
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
<<<<<<< HEAD
      hasError: true,
=======
      error,
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
      errorInfo,
    });
  }

  render() {
<<<<<<< HEAD
    let content;
    const {
      hasError,
=======
    const {
      error,
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
      errorInfo,
    } = this.state;
    const {
      children
    } = this.props;

<<<<<<< HEAD
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
=======
    return error
      ? <Error
        error={error?.toString()}
        componentStack={errorInfo?.componentStack}
        />
      : children;
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
  }
}
