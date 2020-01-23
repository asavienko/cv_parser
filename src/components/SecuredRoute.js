import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

const SecuredRoute = ({ path, component: Component, history }) => {
  const [isAuthorized, setAuthorized] = useState(true);

  useEffect(() => {
    const cookie = Cookies.get("Access-Token");
    const checkUserHasAccess = [...cookie].every(value => value == true);
    setAuthorized(checkUserHasAccess);
  }, [path]);

  return (
    <Route
      path={path}
      render={() => {
        if (!isAuthorized) {
          history.push("/sign-in");
          return <div />;
        }
        return <Component />;
      }}
    />
  );
};

export default withRouter(SecuredRoute);
