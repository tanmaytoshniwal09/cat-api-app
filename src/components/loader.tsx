import React from "react";

const Loader = (): React.ReactElement => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-24 w-24 animate-spin rounded-full border-b-4 border-t-4 border-primary-background"></div>
    </div>
  );
};

export default Loader;
