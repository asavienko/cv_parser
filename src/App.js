import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import CvList from "./components/CvList";
import TopMenu from "./components/TopMenu";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import EmailNotVerified from "./components/EmailNotVerified";
import { PreventSignedInRoute, SecuredRoute } from "./views/ReusableRoutes";
import { checkUser } from "./utils/userUtils";
import { StyledContent, StyledDiv, StyledLayout } from "./App.styles";
import Saved from "./components/Favorites/Saved";

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
              <SecuredRoute path="/saved" component={Saved} />
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
