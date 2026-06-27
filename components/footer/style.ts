import styled from 'styled-components';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { colors } from '../../utils/colors';
import { media } from '../../utils/breakpoints';

export const FooterWrapper = styled.footer`
  background-color: ${colors.neutral.slate900};
  color: ${colors.neutral.slate300};
  padding: 80px 24px 40px;
  border-top: 1px solid rgba(${colors.rgb.slate200}, 0.1);
  width: 100%;
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.3fr;
  gap: 48px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LogoWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  width: fit-content;
`;

export const StyledLogoIcon = styled(Stethoscope)`
  color: ${colors.primary.accent};
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(15deg) scale(1.1);
  }
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${colors.neutral.white};

  span {
    color: ${colors.primary.accent};
  }
`;

export const FooterDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.neutral.slate400};
  margin: 0;
`;

export const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.neutral.white};
  margin: 0;
  position: relative;
  padding-bottom: 8px;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: ${colors.primary.accent};
    border-radius: 2px;
  }
`;

export const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterLink = styled(Link)`
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.neutral.slate400};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${colors.primary.accent};
    transform: translateX(4px);
  }
`;

export const FooterContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FooterContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.neutral.slate400};
`;

export const ContactIconWrapper = styled.div`
  color: ${colors.primary.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const HoursGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  border-bottom: 1px dashed rgba(${colors.rgb.slate200}, 0.1);
  padding-bottom: 8px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const HoursDay = styled.span`
  color: ${colors.neutral.slate400};
  font-weight: 500;
`;

export const HoursTime = styled.span`
  color: ${colors.neutral.slate200};
  font-weight: 600;
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(${colors.rgb.slate200}, 0.08);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  ${media.mobileMd} {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const FooterBottomLinks = styled.div`
  display: flex;
  gap: 24px;

  ${media.mobileMd} {
    justify-content: center;
  }
`;

export const FooterBottomLink = styled(Link)`
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  color: ${colors.neutral.slate500};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.neutral.slate300};
  }
`;
