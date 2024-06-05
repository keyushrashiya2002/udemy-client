import React from "react";
import { Route } from "react-router-dom";

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
