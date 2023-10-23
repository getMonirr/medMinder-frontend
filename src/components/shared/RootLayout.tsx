import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container px-3 mx-auto">{children}</div>;
};

export default RootLayout;
