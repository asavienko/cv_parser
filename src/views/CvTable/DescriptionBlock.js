import React from "react";
import PropTypes from "prop-types";
import {
  StyledAdditionalInfo,
  StyledDescrEl
} from "../CvInformation/CvInforvation.styles";
import { StyledBoldSpan } from "../../styles";

const DescriptionBlock = ({
  description,
  name,
  location,
  yearOfEnding,
  comment
}) => (
  <StyledDescrEl>
    {name ? (
      location ? (
        <>
          <StyledBoldSpan>{name}</StyledBoldSpan>
          <span>{location}</span>
        </>
      ) : (
        <StyledBoldSpan>{name}</StyledBoldSpan>
      )
    ) : null}
    {yearOfEnding && (
      <StyledAdditionalInfo>
        Год окончания:
        {yearOfEnding}
      </StyledAdditionalInfo>
    )}
    {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
    {comment && <div dangerouslySetInnerHTML={{ __html: comment }} />}
  </StyledDescrEl>
);

DescriptionBlock.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  yearOfEnding: PropTypes.arrayOf(PropTypes.number),
  comment: PropTypes.string
};

DescriptionBlock.defaultProps = {
  description: "",
  name: "Не удалось загрузить данные",
  location: "",
  yearOfEnding: [],
  comment: ""
};

export default DescriptionBlock;
