import styled from "styled-components";
import PhoneInput from "react-phone-number-input";

const StyledPhoneInput = styled(PhoneInput)`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  transition: all 0.3s;
  height: 32px;
  color: #000;
  :focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  :hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  //phone-number-component-wrapper
  .react-phone-number-input__row {
    width: 100%;
    padding: 4px 11px;
    line-height: 32px;
  }
  //input
  .react-phone-number-input__phone {
    border: none;
  }
  .react-phone-number-input__phone::placeholder {
    color: #bfbfbf;
  }

  //country block
  .react-phone-number-input__icon {
    border: none;
  }

  //flags
  & > div > div > div > img {
    display: block;
  }

  //international icon
  & > div > div > div > svg {
    display: block;
    margin-top: 2px;
  }
`;

export default StyledPhoneInput;
