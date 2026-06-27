import styled, { keyframes } from 'styled-components';
import { colors } from '../../utils/colors';
import { media, breakpoints } from '../../utils/breakpoints';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AboutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
`;

export const AboutHero = styled.section`
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

export const Section = styled.section`
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin-bottom: 12px;
  text-align: center;
`;

export const SectionSubtitle = styled.p`
  font-size: 15px;
  color: ${colors.neutral.slate500};
  text-align: center;
  max-width: 500px;
  margin: 0 auto 48px auto;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${breakpoints.mobileLg}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatValue = styled.p`
  font-size: 36px;
  font-weight: 800;
  color: ${colors.primary.default};
  margin: 12px 0 6px 0;
`;

export const StatLabel = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate500};
  margin: 0;
  font-weight: 600;
`;

export const StorySection = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 48px;
  margin-bottom: 80px;

  @media (max-width: 968px) {
    flex-direction: column;
    padding: 32px;
  }
`;

export const StoryImageWrapper = styled.div`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  height: 300px;
  position: relative;
  background: ${colors.neutral.slate300};
  width: 100%;
`;

export const StoryContent = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StoryHeading = styled.h3`
  font-size: 26px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0;
`;

export const StoryPara = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${colors.neutral.slate600};
  margin: 0;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const ValueCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(29, 78, 216, 0.04);
  }
`;

export const ValueIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(29, 78, 216, 0.08);
  color: ${colors.primary.default};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ValueMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ValueTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
  margin: 0;
`;

export const ValueDesc = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const VisitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const VisitCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
`;

export const VisitIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(29, 78, 216, 0.08);
  color: ${colors.primary.default};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
`;

export const VisitTitle = styled.h4`
  font-size: 18px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0 0 10px 0;
`;

export const VisitValue1 = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.neutral.slate600};
  margin: 0 0 4px 0;
`;

export const VisitValue2 = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate500};
  margin: 0;
`;
