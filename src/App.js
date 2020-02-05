import React, { useEffect } from "react";
import CvList from "./components/CvTable/CvList";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import EmailNotVerified from "./components/EmailNotVerified/EmailNotVerified";
import SecuredRoute from "./components/SecuredRoute";
import PreventSignedInRoute from "./components/PreventSignedInRoute";
import { checkUser } from "./utils";
import { StyledContent, StyledDiv, StyledLayout } from "./App.styles";

function App() {
  useEffect(() => {
    checkUser();
  });

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

export default App;
