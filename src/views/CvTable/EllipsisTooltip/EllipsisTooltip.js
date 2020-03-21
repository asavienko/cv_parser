import React, { useRef, useState } from 'react';
import { Tooltip } from 'antd';
import { StyledSpan } from './EllipsisTooltip.styles';

function EllipsisTooltip({ title }) {
  const spanRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible) => {
    spanRef.current.clientWidth < spanRef.current.scrollWidth
      && setVisible(visible);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Tooltip
      title={() => <span onClick={stopPropagation}>{title}</span>}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <StyledSpan ref={spanRef}>{title}</StyledSpan>
    </Tooltip>
  );
}

export default EllipsisTooltip;
