import React from "react";
import ru from "react-phone-number-input/locale/ru";
import PropTypes from "prop-types";
import { StyledPhoneInput } from "./SignUp.styles.js";

const PhoneNumberInputComponent = ({ onChange }) => {
  return (
    <StyledPhoneInput
      type="tel"
      country="UA"
      labels={ru}
      onChange={onChange}
      placeholder="Ваш телефон"
    />
  );
};

PhoneNumberInputComponent.propTypes = {
  onChange: PropTypes.func
};

PhoneNumberInputComponent.defaultProps = {
  onChange: () => {}
};

export default PhoneNumberInputComponent;
