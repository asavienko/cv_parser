import styled from "styled-components";
import PhoneInput from "react-phone-number-input";

export const StyledPhoneInput = styled(PhoneInput)`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  transition: all 0.3s;
  height: 32px;
  color: #000;

  :hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  //
  // -==styles for react-phone-number-input component==-
  //
  //styles for wrapper div
  .react-phone-number-input__row {
    width: 100%;
    padding: 4px 11px;
    line-height: 32px;
  }

  //styles for input field
  .react-phone-number-input__phone {
    border: none;
  }
  .react-phone-number-input__phone::placeholder {
    color: #bfbfbf;
  }

  //styles for country block
  .react-phone-number-input__icon {
    border: none;
  }

  //styles for flags icons
  .react-phone-number-input__icon img {
    display: block;
  }

  //styles for international icon
  .react-phone-number-input__icon svg {
    display: block;
    margin-top: 2px;
  }
`;

export const formItemLayout = {
  labelCol: { sm: { span: 7 }, md: { span: 6 }, xxl: { span: 2, offset: 7 } },
  wrapperCol: { sm: { span: 15 }, md: { span: 13 }, xxl: { span: 6 } }
};
export const buttonItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 15, offset: 7 },
    md: { span: 13, offset: 6 },
    xxl: { span: 6, offset: 9 }
  }
};
