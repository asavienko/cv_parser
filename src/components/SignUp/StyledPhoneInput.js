import styled from "styled-components";
import PhoneInput from "react-phone-number-input";

const StyledPhoneInput = styled(PhoneInput)`
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

export default StyledPhoneInput;
