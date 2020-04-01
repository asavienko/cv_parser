import React, { useState } from "react";
import { Button, Form } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {
  InlineFormItem,
  SalaryInput,
  StyledAge,
  StyledDrawer,
  StyledSpan,
  WrapperFormItem
} from "./FiltersSet.styles";

const FiltersSet = () => {
  const [expand, setExpand] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const resetFilters = () => {
    form.resetFields();
  };

  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const FilterForm = () => (
    <Form form={form} name="filterSet" onFinish={onFinish} layout="inline">
      <WrapperFormItem label="Зарплата">
        <InlineFormItem name="salaryFrom">
          <SalaryInput placeholder="грн" />
        </InlineFormItem>
        <StyledSpan>-</StyledSpan>
        <InlineFormItem name="salaryTo">
          <SalaryInput placeholder="грн" />
        </InlineFormItem>
      </WrapperFormItem>
      <WrapperFormItem label="Возраст">
        <InlineFormItem name="ageFrom">
          <StyledAge />
        </InlineFormItem>
        <StyledSpan>-</StyledSpan>
        <InlineFormItem name="ageTo">
          <StyledAge />
        </InlineFormItem>
      </WrapperFormItem>
      <WrapperFormItem name="buttons">
        <Button type="primary" htmlType="submit">
          Применить
        </Button>
        <Button onClick={resetFilters}>Очистить</Button>
        <a
          style={{
            marginLeft: 8,
            fontSize: 12
          }}
          onClick={() => {
            setExpand(!expand);
            setVisible(!visible);
          }}
        >
          {expand ? <UpOutlined /> : <DownOutlined />}
          {expand ? " Свернуть" : " Развернуть"}
        </a>
      </WrapperFormItem>
    </Form>
  );

  return (
    <>
      {FilterForm()}
      <StyledDrawer
        placement="top"
        closable={false}
        onClose={() => setVisible(!visible)}
        visible={visible}
        getContainer={false}
      >
        {FilterForm()}
      </StyledDrawer>
    </>
  );
};

export default FiltersSet;
