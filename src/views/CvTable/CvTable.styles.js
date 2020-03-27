import styled from "styled-components";
import { Table } from "antd";

export const StyledTable = styled(Table)`
  .ant-table-body {
    overflow: auto !important;
    height: ${() => `${window.innerHeight - 240}px`};
  }
  .ant-table-placeholder {
    height: ${() => `${window.innerHeight - 256}px`};
  }
  .ant-table-body::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  .ant-table-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 0 1px;
  }
  .ant-table-body:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.45);
  }
  .ant-table-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;
