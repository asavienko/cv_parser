import React from "react";
import { Button, Col, Form, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { ResponsiveInput, StyledButton } from "./Home.styles";
import CitySelect from "../../views/CitySelect/CitySelect";

const Home = ({
  onSearchSubmit,
  onSelectChange,
  dictionaryCity,
  loadingCites,
  form
}) => (
  <Form form={form} onFinish={onSearchSubmit} name="homeSearch">
    <Row span={22}>
      <Col xs={24} sm={24} lg={7} xl={6}>
        <CitySelect
          onSelectChange={onSelectChange}
          loadingCites={loadingCites}
          dictionaryCity={dictionaryCity}
        />
      </Col>
      <Col xs={24} sm={24} lg={14} xl={16}>
        <Form.Item name="keywords">
          <ResponsiveInput placeholder="Введите ключивые слова" size="large" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={24} lg={3} xl={2}>
        <StyledButton
          htmlType="submit"
          type="primary"
          icon={<SearchOutlined />}
          size="large"
          block
        >
          Найти
        </StyledButton>
      </Col>
    </Row>
  </Form>
);

Home.propTypes = {
  onSearchSubmit: PropTypes.func,
  onSelectChange: PropTypes.func,
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  loadingCites: PropTypes.bool,
  form: PropTypes.objectOf(PropTypes.any)
};
Home.defaultProps = {
  onSearchSubmit: () => {},
  onSelectChange: () => {},
  dictionaryCity: [{ id: 0, ru: "Харьков" }],
  loadingCites: false,
  form: {}
};

export default Home;
