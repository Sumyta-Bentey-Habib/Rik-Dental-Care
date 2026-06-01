import styled from 'styled-components';

export const ChatPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 24px;
  background-color: #f8fafc;
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

export const ChatPageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
`;

export const ChatPageTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin: 0;
`;

export const ChatPageSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

export const ChatWindowContainer = styled.div`
  flex: 1;
  min-height: 0; /* Ensures container doesn't overflow parent and respects layout height */
`;
