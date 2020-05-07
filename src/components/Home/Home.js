import React from "react";
import { Col, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ResponsiveInput, StyledButton } from "./Home.styles";
import CitySelect from "../../views/CitySelect/CitySelect";

const Home = ({
  onSearchPressed,
  onSelectChange,
  dictionaryCity,
  loadingCites
}) => (
  <Row span={22}>
    <Col xs={24} sm={24} lg={7} xl={6}>
      <CitySelect
        onSelectChange={onSelectChange}
        loadingCites={loadingCites}
        dictionaryCity={dictionaryCity}
      />
    </Col>
    <Col xs={24} sm={24} lg={14} xl={16}>
      <ResponsiveInput placeholder="Введите ключивые слова" size="large" />
    </Col>
    <Col xs={24} sm={24} lg={3} xl={2}>
      <StyledButton
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={onSearchPressed}
        block
      >
        Найти
      </StyledButton>
    </Col>
  </Row>
);

Home.propTypes = {
  onSearchPressed: PropTypes.func,
  onSelectChange: PropTypes.func,
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  loadingCites: PropTypes.bool
};
Home.defaultProps = {
  onSearchPressed: () => {},
  onSelectChange: () => {},
  dictionaryCity: [{ id: 0, ru: "Харьков" }],
  loadingCites: false
};

export default Home;
