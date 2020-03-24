import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserFromCookieStorage } from "../../services/cookieStorage";

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
      if (!emailVerified) {
        return path === "/email-not-verified" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/email-not-verified" }} />
        );
      }
      return path === "/email-not-verified" ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

SecuredRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string
};

SecuredRoute.defaultProps = { path: "/" };

export default SecuredRoute;
