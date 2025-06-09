import React from "react";

const ErrorBanner = ({ error }) => {
  return <div className="text-red-500 text-center p-2">{error}</div>;
};

export default ErrorBanner;
