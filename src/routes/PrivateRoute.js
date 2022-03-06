import React from "react";
import { Route } from "react-router-dom";
import HomeLayout from "modules/layout";

export default ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <HomeLayout>
          <Component {...props} />
        </HomeLayout>
      )}
    />
  );
};