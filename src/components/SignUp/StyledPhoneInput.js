import styled from "styled-components";
import PhoneInput from "react-phone-number-input";

const StyledPhoneInput = styled(PhoneInput)`
  /*
  //default styles
  & .react-phone-number-input__icon {
    width: 1.24em;
    height: 0.93em;
    box-sizing: content-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.5);
    border-image: initial;
  }
  & .react-phone-number-input__country-select {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
  }
  & .react-phone-number-input__country-select-arrow {
    display: block;
    content: "";
    width: 0px;
    height: 0px;
    margin-bottom: 0.1em;
    margin-top: 0.3em;
    margin-left: 0.3em;
    border-left-color: transparent;
    border-right-color: transparent;
    color: rgb(184, 189, 196);
    opacity: 0.7;
    border-width: 0.35em 0.2em 0px;
    border-style: solid;
    transition: color 0.1s ease 0s;
  }
  & .react-phone-number-input__country--native {
    position: relative;
    align-self: stretch;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 0.5em;
  }
  */

  //rewrote styles
  input {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum", "tnum";
    position: relative;
    display: table-cell;
    width: 100%;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 32px;
    line-height: 1.5 \\9;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
  }
  input:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  input:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  & > div > div {
    display: table-cell;
    position: relative;
    padding: 0 11px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  & > div > div > img {
    display: block;
    border: 0;
  }
`;

export default StyledPhoneInput;
