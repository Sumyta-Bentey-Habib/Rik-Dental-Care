import styled from 'styled-components';
import { colors } from '../utils/colors';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.neutral.slate50};
  font-family: var(--font-geist-sans), sans-serif;
`;

export const AppBodyLayout = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
`;

export const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 72px);
`;
