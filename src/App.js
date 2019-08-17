import React, { useState } from "react";
import CvList from "./components/CvTable/CvList";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import { Layout } from "antd";
import styled from "styled-components";
import Favorites from "./components/Favorites/Favorites";
import openNotification from "./components/ReusableComponents/Notification";

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
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [rawList, setRawList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCvList = async () => {
    setLoading(true);
    try {
      const response = await fetch("/cvlist");
      const obj = await response.json();
      if (obj.confirmation === "fail") {
        throw new Error();
      }
      for (let cv of obj.data) {
        cv.key = cv._id;
      }
      setRawList(obj.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      openNotification({
        type: "error",
        message: "Не удалось загрузить данные"
      });
    }
  };
  return (
    <Router>
      <StyledLayout>
        <StyledHeader theme="light">
          <TopMenu />
        </StyledHeader>
        <StyledDiv>
          <StyledContent>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/favorites" component={Favorites} />
              <Route
                path="/list"
                component={() => (
                  <CvList
                    rawList={rawList}
                    fetchCvList={fetchCvList}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </StyledContent>
        </StyledDiv>
      </StyledLayout>
    </Router>
  );
}

export default App;
