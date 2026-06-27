import styled, { keyframes } from 'styled-components';
import { colors } from '../../utils/colors';
import { media } from '../../utils/breakpoints';

export const SpecialistsWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
`;

export const Hero = styled.section`
  padding: 80px 24px;
  background: linear-gradient(135deg, ${colors.neutral.slate900} 0%, #1e293b 100%);
  color: ${colors.neutral.white};
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const HeroBadge = styled.span`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: ${colors.neutral.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 20px;
  display: inline-block;
`;

export const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -1px;

  span {
    color: ${colors.primary.accent};
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 17px;
  color: rgba(241, 245, 249, 0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

interface DoctorCardProps {
  $reversed?: boolean;
}

export const DoctorCard = styled.div<DoctorCardProps>`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 40px;
  display: flex;
  flex-direction: ${(props) => (props.$reversed ? 'row-reverse' : 'row')};
  gap: 48px;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(29, 78, 216, 0.03);
  }

  ${media.desktopSm} {
    flex-direction: column;
    padding: 32px;
    gap: 32px;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  max-width: 320px;
  width: 100%;
  height: 380px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${colors.neutral.slate300};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
`;

export const DocAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DoctorDetails = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const DocHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DocName = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0;
`;

export const DocRole = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.primary.default};
`;

export const DocRatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #eab308;
`;

export const DocReviewsCount = styled.span`
  color: ${colors.neutral.slate500};
  font-weight: 500;
`;

export const SpecialtyBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SpecialtyBadge = styled.span`
  background: ${colors.neutral.slate100};
  border: 1px solid rgba(226, 232, 240, 0.8);
  color: ${colors.neutral.slate600};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

export const CredentialsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 1px dashed rgba(226, 232, 240, 0.8);
  padding-top: 18px;
`;

export const CredentialItem = styled.li`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const CredMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CredTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const CredSub = styled.span`
  font-size: 12px;
  color: ${colors.neutral.slate500};
`;

export const BookButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.2);
  transition: all 0.2s ease;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${colors.primary.hover};
    box-shadow: 0 6px 16px rgba(29, 78, 216, 0.3);
    transform: translateY(-1px);
  }
`;
