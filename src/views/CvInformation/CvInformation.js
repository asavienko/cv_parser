import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StyledDrawer } from "./CvInforvation.styles";
import { StyledWrapper } from "./StyledWrapper.styles";
import { getCvInfo } from "../../services/cvRequests";

function CvInformation({ visible, onCvInformationClose, resumeId }) {
  const [string, setString] = useState("");
  useEffect(() => {
    visible
      ? getCvInfo(resumeId).then(response => setString(response))
      : setString("");
  }, [visible, string]);

  return (
    <StyledDrawer
      visible={visible}
      onClose={onCvInformationClose}
      destroyOnClose
    >
      <StyledWrapper dangerouslySetInnerHTML={{ __html: string }} />
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
