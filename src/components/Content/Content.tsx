import React from "react";

const Content: React.FC = ({ children }) => (
  <div className="px-8 lg:px-0 mx-auto container relative" id="content">
    {children}
  </div>
);

export default Content;
