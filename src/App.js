import React from "react";
import CvTable from "./components/CvTable/CvTable";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { Layout } from "antd";
import styled from "styled-components";

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  background: RGBA(255, 255, 255, 1);
  padding: 0;
  height: 48px;
`;
const StyledDiv = styled.div`
  background: RGBA(236, 236, 236, 1);
`;
const StyledContent = styled(Content)`
  background: RGBA(255, 255, 255, 1);
  margin: 8px 12px;
  padding: 8px 12px;
  overflow: auto;
  height: calc(100vh - 64px);
`;

function App() {
  return (
    <Router>
      <Layout>
        <StyledHeader
          theme="light"
        >
          <TopMenu />
        </StyledHeader>
        <StyledDiv>
          <StyledContent>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/favorites" />
              <Route path="/list" component={CvTable} />
            </Switch>
          </StyledContent>
        </StyledDiv>
      </Layout>
    </Router>
  );
}

export default App;
