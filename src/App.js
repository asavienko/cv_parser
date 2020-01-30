import React, { useEffect } from "react";
import CvList from "./components/CvTable/CvList";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import styled from "styled-components";
import Favorites from "./components/Favorites/Favorites";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import EmailNotVerified from "./components/EmailNotVerified";
import SecuredRoute from "./components/SecuredRoute";
import _ from "lodash";
import { getRequest } from "./services/fetchUtils";
import {
  getAuthHeader,
  getUserFromCookieStorage,
  getUserId,
  setUserToCookieStorage
} from "./services/cookieStorage";
import openNotification from "./components/ReusableComponents/Notification";
import { setUserAction } from "./actions/userActions";
import { connect } from "react-redux";

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
    const userFromCookie = getUserFromCookieStorage();
    setUserToStore(userFromCookie);
    getRequest("/users", { ...getAuthHeader(), ...getUserId() })
      .then(response => {
        const [user] = response;
        user
          ? setUserToCookieStorage(user) && setUserToStore(user)
          : Promise.reject(
              "Пользователь не найден. Повторите или обновите страницу."
            );
      })
      .catch(err =>
        openNotification({
          message: "Что-то пошло не так.",
          description: JSON.stringify(err)
        })
      );
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

              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/email-not-verified" component={EmailNotVerified} />
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
