import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/colors';

export const EmergencyWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
`;

export const EmergencyHero = styled.section`
  padding: 80px 24px;
  background: linear-gradient(135deg, ${colors.emergency.red800} 0%, ${colors.emergency.red900} 100%);
  color: ${colors.neutral.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -20%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${colors.rgb.white}, 0.05) 0%, transparent 60%);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${colors.rgb.white}, 0.5);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(${colors.rgb.white}, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(${colors.rgb.white}, 0);
  }
`;

export const AlarmBadge = styled.span`
  background: rgba(${colors.rgb.white}, 0.2);
  border: 1px solid rgba(${colors.rgb.white}, 0.25);
  color: ${colors.neutral.white};
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
  display: inline-block;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const HeroTitle = styled.h1`
  font-size: 46px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -1px;

  span {
    color: ${colors.emergency.red300};
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 16px;
  color: rgba(${colors.rgb.red100}, 0.9);
  max-width: 600px;
  margin: 0 auto 32px auto;
  line-height: 1.6;
`;

export const HotlineNumberButton = styled.a`
  background: ${colors.neutral.white};
  color: ${colors.emergency.red700};
  font-size: 16px;
  font-weight: 800;
  padding: 16px 36px;
  border-radius: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(${colors.rgb.black}, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${colors.emergency.red100};
    transform: translateY(-2px);
  }
`;

export const ContentContainer = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const GuideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionHeading = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0 0 8px 0;
  border-left: 4px solid ${colors.emergency.red500};
  padding-left: 12px;
`;

export const AccordionItem = styled.details`
  background: ${colors.neutral.white};
  border: 1px solid rgba(${colors.rgb.slate200}, 0.8);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(${colors.rgb.black}, 0.008);
  transition: border-color 0.2s ease;

  &[open] {
    border-color: rgba(${colors.rgb.red500}, 0.3);
  }
`;

export const SummaryHeader = styled.summary`
  padding: 20px 24px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const SummaryIcon = styled.span`
  color: ${colors.emergency.red500};
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  details[open] & {
    transform: rotate(180deg);
  }
`;

export const DetailsBody = styled.div`
  padding: 0 24px 20px 24px;
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.neutral.slate600};
  border-top: 1px dashed rgba(${colors.rgb.slate200}, 0.5);
  padding-top: 16px;
`;

export const AlertBox = styled.div`
  background: ${colors.emergency.red50};
  border: 1px solid ${colors.emergency.red150};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const AlertTextMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AlertTitle = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: ${colors.emergency.red800};
`;

export const AlertDesc = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${colors.emergency.red900};
  margin: 0;
`;
