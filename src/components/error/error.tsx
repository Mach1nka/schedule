import React from "react";

interface ErrorProps {
  error: string;
  componentStack?: string;
}

const Error = (props: ErrorProps) => {
  const {
    error,
    componentStack,
  } = props;

  return (
    <>
      <h3>Error!</h3>
      <p>{error}</p>
      <p>{componentStack}</p>
    </>
  );
};

export default Error;
