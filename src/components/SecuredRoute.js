import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserFromCookieStorage } from "../services/cookieStorage";

const SecuredRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const {
        token: authenticatedUser,
        emailVerified
      } = getUserFromCookieStorage();
      if (!authenticatedUser) {
        return <Redirect to={{ pathname: "/sign-in" }} />;
      }
      if (authenticatedUser && !emailVerified) {
        return path === "/email-not-verified" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/email-not-verified" }} />
        );
      }
      return emailVerified && path === "/email-not-verified" ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

export default SecuredRoute;
