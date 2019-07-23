import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";

const StyledSpan = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
`;

function EllipsisTooltip({ title }) {
  const spanRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = visible => {
    spanRef.current.clientWidth < spanRef.current.scrollWidth &&
      setVisible(visible);
  };
  const stopPropagation = (e) => {
    console.log(e);
    e.stopPropagation();
  };

  return (
    <Tooltip
      title={()=> <span onClick={stopPropagation}>{title}</span>}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <StyledSpan ref={spanRef}>{title}</StyledSpan>
    </Tooltip>
  );
}

export { EllipsisTooltip };
