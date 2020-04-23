import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  StyledDrawer,
  StyledSpin,
  StyledWrapper
} from "./CvInforvation.styles";
import { getCvInfo } from "../../services/cvRequests";

function CvInformation({ visible, onCvInformationClose, resumeId }) {
  const [string, setString] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    visible
      ? setLoading(true) ||
        getCvInfo(resumeId).then(response => {
          setLoading(false);
          setString(response);
        })
      : setString("");
  }, [visible, string, resumeId]);

  return (
    <StyledDrawer
      visible={visible}
      onClose={onCvInformationClose}
      destroyOnClose
    >
      <StyledSpin spinning={loading}>
        <StyledWrapper dangerouslySetInnerHTML={{ __html: string }} />
      </StyledSpin>
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
