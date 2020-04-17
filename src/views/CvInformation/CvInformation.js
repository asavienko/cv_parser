import React from "react";
import PropTypes from "prop-types";
import { StyledDrawer } from "./CvInforvation.styles";

function CvInformation({ visible, onCvInformationClose, resumeId }) {
  return (
    <StyledDrawer visible={visible} onClose={onCvInformationClose}>
      <iframe
        src={`https://rabota.ua/cv/${resumeId}`}
        width={"100%"}
        height={"100%"}
      />
    </StyledDrawer>
  );
}

CvInformation.propTypes = {
  visible: PropTypes.bool,
  resumeId: PropTypes.number,
  cvInfo: PropTypes.shape({
    cvInformation: PropTypes.object
  }),
  onCvInformationClose: PropTypes.func
};

CvInformation.defaultProps = {
  visible: false,
  resumeId: 0,
  cvInfo: {
    cvInformation: {
      salary: 0,
      displayName: "displayName",
      surname: "surname",
      name: "name"
    }
  },
  onCvInformationClose: () => {}
};

export default CvInformation;
