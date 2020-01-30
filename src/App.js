import React, { useEffect } from "react";
import CvList from "./components/CvTable/CvList";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import styled from "styled-components";
import Favorites from "./components/Favorites/Favorites";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import EmailNotVerified from "./components/EmailNotVerified";
import SecuredRoute from "./components/SecuredRoute";
import _ from "lodash";
import {
  clearCookieStorage,
  getUserFromCookieStorage,
  setUserToCookieStorage
} from "./services/cookieStorage";
import { setUserAction } from "./actions/userActions";
import { connect } from "react-redux";
import PreventSignedInRoute from "./components/PreventSignedInRoute";
import { generateAuthHeader, getRequest } from "./services/fetchUtils";
import openNotification from "./components/ReusableComponents/Notification";

const StyledDiv = styled.div`
  background: RGBA(236, 236, 236, 1);
`;
const StyledContent = styled.div`
  background: RGBA(255, 255, 255, 1);
  margin: 8px 12px;
  padding: 8px 12px;
  overflow: auto;
  height: calc(100vh - 64px);
`;
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const checkUserAndSetGlobally = ({ userFromStore, setUserToStore }) => {
  if (_.isEmpty(userFromStore)) {
    const {
      token,
      _id,
      ...userFromCookieWithoutIdAndToken
    } = getUserFromCookieStorage();
    if (token && _id) {
      setUserToStore({
        token,
        _id,
        ...userFromCookieWithoutIdAndToken
      });
      getRequest("/users", { _id, ...generateAuthHeader(token) })
        .then(response => {
          const [user] = response;
          return user
            ? setUserToCookieStorage(user) && setUserToStore(user)
            : { userNotFound: true };
        })
        .then(error => {
          error.userNotFound &&
            openNotification({
              message: "Пользователь не найден.",
              description:
                "Если ошибка повторится, обратитесь к администратору.  "
            });
        })
        .catch(err => {
          clearCookieStorage();
          openNotification({
            type: "error",
            message: "Что-то пошло не так.",
            description:
              "Если ошибка повторится, обратитесь к администратору. " +
              JSON.stringify(err)
          });
        });
    }
    if (!token || !_id) clearCookieStorage();
  }
};

function App({ userFromStore, setUserToStore }) {
  useEffect(() => {
    checkUserAndSetGlobally({ userFromStore, setUserToStore });
  }, [userFromStore, setUserToStore]);

  return (
    <Router>
      <StyledLayout>
        <TopMenu />
        <StyledDiv>
          <StyledContent>
            <Switch>
              <SecuredRoute exact path="/" component={Home} />
              <SecuredRoute path="/favorites" component={Favorites} />
              <SecuredRoute path="/list" component={CvList} />
              <SecuredRoute
                path="/email-not-verified"
                component={EmailNotVerified}
              />
              <PreventSignedInRoute path="/sign-up" component={SignUp} />
              <PreventSignedInRoute path="/sign-in" component={SignIn} />
              <Redirect to={{ pathname: "/" }} />
            </Switch>
          </StyledContent>
        </StyledDiv>
      </StyledLayout>
    </Router>
  );
}

const mapStateToProps = ({ userReducer: { user } }) => ({
  userFromStore: user
});

const mapDispatchToProps = dispatch => ({
  setUserToStore: credentials => dispatch(setUserAction(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
