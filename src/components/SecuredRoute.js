import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

const SecuredRoute = ({ path, component, history }) => {
  useEffect(() => {
    const token = Cookies.get("Access-Token");
    !token && setAuthorized(false);
  }, [path]);
  const [isAuthorized, setAuthorized] = useState(true);
  return isAuthorized ? (
    <Route path={path} component={component} />
  ) : (
    <Route
      path={path}
      render={() => {
        history.push("/sign-in");
        return <div />;
      }}
    />
  );
};

export default withRouter(SecuredRoute);
