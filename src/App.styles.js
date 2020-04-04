import styled from "styled-components";

export const StyledDiv = styled.div`
  background: RGBA(236, 236, 236, 1);
`;
export const StyledContent = styled.div`
  background: RGBA(255, 255, 255, 1);
  margin: 8px 12px;
  padding: 8px 12px;
  overflow: auto;
  height: calc(100vh - 64px);

  &&::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &&::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 0 1px;
  }
  &&:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.45);
  }
  &&::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.55);
  }
`;
export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
