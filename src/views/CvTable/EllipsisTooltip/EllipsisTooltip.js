import React, { useRef, useState } from "react";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { StyledSpan } from "./EllipsisTooltip.styles";

function EllipsisTooltip({ title }) {
  const spanRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = componentIsVisible => {
    spanRef.current.clientWidth < spanRef.current.scrollWidth &&
      setVisible(componentIsVisible);
  };

  return (
    <Tooltip
      title={title}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <StyledSpan ref={spanRef}>{title}</StyledSpan>
    </Tooltip>
  );
}

EllipsisTooltip.propTypes = {
  title: PropTypes.string
};
EllipsisTooltip.defaultProps = {
  title: ""
};

export default EllipsisTooltip;
