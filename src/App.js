import React from "react";
import CvTable from "./components/CvTable/CvTable";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { Layout } from "antd";
import styled from "styled-components";

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  background: white;
  padding: 0;
  height: 48px;
`;
const StyledDiv = styled.div`
  background: #ececec;
`;
const StyledContent = styled(Content)`
    background: #fff;
    margin: 8px 12px;
    padding: 8px 12px;
    overflow: auto;
`

function App() {
  return (
    <Router>
      <Layout>
        <StyledHeader
          theme="light"
          style={{ background: "#fff", padding: 0, height: 48 }}
        >
          <TopMenu />
        </StyledHeader>
        <StyledDiv>
          <StyledContent>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/favorites" />
              <Route path="/list" component={CvTable} />
              <Route component={() => <div>Hello world...</div>} />
            </Switch>
          </StyledContent>
        </StyledDiv>
      </Layout>
    </Router>
  );
}

export default App;
