import React, { useEffect, useState } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const SecuredRoute = ({
  path,
  component: Component,
  history,
  userFromStore
}) => {
  const [isAuthorized, setAuthorized] = useState(true);

  useEffect(() => {
    !userFromStore.emailVerified && history.push("email-not-verified")
  }, [userFromStore]);

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

const mapStateToProps = ({ userReducer: { user } }) => ({
  userFromStore: user
});

export default connect(mapStateToProps)(withRouter(SecuredRoute));
