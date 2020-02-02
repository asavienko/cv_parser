import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserFromCookieStorage } from "../services/cookieStorage";

const PreventSignedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const {
        token: authenticatedUser,
        emailVerified
      } = getUserFromCookieStorage();
      if (authenticatedUser) {
        return (
          <Redirect
            to={{ pathname: emailVerified ? "/" : "/email-not-verified" }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default PreventSignedInRoute;
