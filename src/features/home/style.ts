import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/colors';
import { media } from '@/constants/breakpoints';

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

export const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
  display: flex;
  flex-direction: column;
`;

export const SectionAnchor = styled.div`
  scroll-margin-top: 72px;
`;

// 1. HERO SECTION
export const HeroSection = styled.section`
  padding: 100px 24px;
  background: linear-gradient(rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.88)), 
              url('/hero-dentistry.png') no-repeat center center;
  background-size: cover;
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  color: ${colors.neutral.white};
  position: relative;
  overflow: hidden;
`;

export const HeroInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;

  ${media.desktop} {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.6s ease-out;
`;

export const HeroBadge = styled.span`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: ${colors.neutral.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 24px;

  ${media.desktop} {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 24px;
  color: ${colors.neutral.white};

  span {
    color: ${colors.primary.accent};
    background: linear-gradient(135deg, #60a5fa, ${colors.primary.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ${media.tablet} {
    font-size: 42px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgba(241, 245, 249, 0.9);
  margin-bottom: 40px;
  max-width: 580px;

  ${media.desktop} {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 48px;

  ${media.desktop} {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroPrimaryButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary.default}, ${colors.primary.blue600});
  color: ${colors.neutral.white};
  border: none;
  font-size: 15px;
  font-weight: 700;
  padding: 16px 28px;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(${colors.rgb.primary}, 0.25);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(${colors.rgb.primary}, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.neutral.white};
    outline-offset: 3px;
  }
`;

export const HeroSecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: ${colors.neutral.white};
  font-size: 15px;
  font-weight: 700;
  padding: 16px 28px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.neutral.white};
    outline-offset: 3px;
  }
`;

export const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;

  ${media.desktop} {
    display: none;
  }
`;

export const FloatingVideoCard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 16px;
  color: ${colors.neutral.white};
  display: flex;
  gap: 14px;
  align-items: center;
  width: 320px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -40px;
  right: 40px;
  animation: ${slideUp} 0.8s ease-out;
`;

export const VideoThumbnailWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  background: #000000;
  flex-shrink: 0;

  img {
    opacity: 0.85;
    object-fit: cover;
  }
`;

export const PlayButtonOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  background: ${colors.neutral.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary.default};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const VideoCardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const VideoCardText = styled.span`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
`;

export const VideoCardRating = styled.span`
  font-size: 11px;
  color: #fbbf24;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const QuickSelectTabs = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 32px;
`;

export const QuickTab = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: ${colors.neutral.white};
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.neutral.white};
    color: ${colors.neutral.slate900};
    border-color: ${colors.neutral.white};
  }
`;

// 2. CARE TIMELINE SECTION
export const TimelineSection = styled.section`
  background: ${colors.neutral.white};
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 24px 0;
`;

export const TimelineInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TimelineStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StepNumber = styled.span`
  color: ${colors.primary.default};
  background: rgba(${colors.rgb.primary}, 0.08);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StepText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.neutral.slate600};
`;

// 3. ABOUT US SECTION
export const AboutSection = styled.section`
  padding: 100px 24px;
  background-color: ${colors.neutral.white};
`;

export const AboutInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  align-items: center;

  ${media.desktop} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const AboutVisualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  position: relative;
`;

export const VisualCard = styled.div`
  border-radius: 24px;
  overflow: hidden;
  background: ${colors.neutral.slate100};
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardHeightOne = styled(VisualCard)`
  height: 280px;
`;

export const CardHeightTwo = styled(VisualCard)`
  height: 200px;
  margin-top: 40px;
  
  ${media.desktop} {
    margin-top: 0;
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SectionBadgeLabel = styled.span`
  background: ${colors.secondary.surface};
  color: ${colors.primary.dark};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SectionTitleHeader = styled.h2`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.25;
  color: ${colors.neutral.slate900};
  letter-spacing: -1px;

  span {
    color: ${colors.neutral.slate500};
    font-weight: 500;
  }
`;

export const SectionParagraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${colors.neutral.slate500};
`;

export const AboutMetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  border-top: 1px solid ${colors.neutral.slate100};
  padding-top: 24px;
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MetricNum = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: ${colors.primary.default};
  letter-spacing: -0.5px;
`;

export const MetricName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate600};
`;

// 4. ADVANCED CARE SECTION
export const AdvancedSection = styled.section`
  padding: 100px 24px;
  background-color: ${colors.neutral.slate50};
`;

export const AdvancedInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const AdvancedHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
`;

export const AdvancedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  ${media.desktop} {
    grid-template-columns: 1fr;
  }
`;

export const DoctorProfileCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  align-items: center;

  ${media.mobileMd} {
    grid-template-columns: 1fr;
  }
`;

export const DoctorImageWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
  height: 240px;
  background: ${colors.neutral.slate300};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DoctorCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DocName = styled.h4`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0;
`;

export const DocRole = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate500};
`;

export const DocRatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #eab308;
`;

export const DocBio = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${colors.neutral.slate600};
  margin: 0;
`;

export const DoctorCardButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(${colors.rgb.primary}, 0.2);
  transition: all 0.2s ease;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

export const StatsHighlightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoStatCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.01);
`;

export const InfoStatLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.neutral.slate600};
`;

export const InfoStatNumber = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.primary.default};
`;

export const ProgressTrackerCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.015);
`;

export const TrackerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TrackerTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const TrackerPercent = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: ${colors.primary.default};
`;

export const DotBarChart = styled.div`
  display: flex;
  gap: 6px;
  height: 48px;
  align-items: flex-end;
`;

interface DotBarProps {
  $height: string;
  $active: boolean;
}

export const DotBarLine = styled.div<DotBarProps>`
  flex: 1;
  height: ${(props) => props.$height};
  background-color: ${(props) => (props.$active ? colors.primary.default : colors.neutral.slate200)};
  border-radius: 4px;
  transition: height 0.3s ease;
`;

// 5. WHY CHOOSE US SECTION
export const WhyChooseSection = styled.section`
  padding: 100px 24px;
  background-color: ${colors.neutral.white};
`;

export const WhyChooseInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 32px;

  ${media.desktop} {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCardBase = styled.div`
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.015);
  height: 280px;
`;

export const PhotoFeatureCard = styled(FeatureCardBase)`
  background: ${colors.neutral.slate300} url('/dental-chair.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent 70%);
  }
`;

export const PhotoCardTitle = styled.span`
  color: ${colors.neutral.white};
  font-size: 18px;
  font-weight: 800;
  z-index: 2;
  margin-top: auto;
`;

export const TealFeatureCard = styled(FeatureCardBase)`
  background: #14b8a6;
  color: ${colors.neutral.white};
`;

export const TealCardTitle = styled.h4`
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
`;

export const TealCardDesc = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

export const TealCardBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: ${colors.neutral.white};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
`;

export const ChartFeatureCard = styled(FeatureCardBase)`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
`;

export const ChartCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ChartCardTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const ChartCardDesc = styled.span`
  font-size: 12px;
  color: ${colors.neutral.slate500};
`;

export const ChartMetricNum = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin-top: 10px;
`;

export const MicroBarGrid = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  height: 80px;
  margin-top: 16px;
`;

interface MicroBarProps {
  $height: string;
}

export const MicroBarElement = styled.div<MicroBarProps>`
  flex: 1;
  height: ${(props) => props.$height};
  background-color: ${colors.primary.accent};
  border-radius: 6px;
  transition: height 0.3s ease;
`;

// 6. TESTIMONIALS SECTION
export const TestimonialSection = styled.section`
  padding: 100px 24px;
  background-color: ${colors.neutral.slate50};
`;

export const CarouselContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 28px;
  padding: 48px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

export const QuoteIconWrapper = styled.div`
  color: rgba(${colors.rgb.primary}, 0.12);
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 1;
`;

export const CarouselBodyText = styled.p`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 600;
  color: ${colors.neutral.slate900};
  font-style: italic;
  margin: 0;
  text-align: center;
  z-index: 2;
  position: relative;
`;

export const CarouselMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  border-top: 1px solid ${colors.neutral.slate100};
  padding-top: 24px;
  z-index: 2;

  ${media.mobileMd} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CarouselArrows = styled.div`
  display: flex;
  gap: 12px;
`;

export const ArrowBtn = styled.button`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 1);
  color: ${colors.neutral.slate600};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.primary.default};
    border-color: rgba(${colors.rgb.primary}, 0.3);
    background: rgba(${colors.rgb.primary}, 0.04);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

// 7. SECTION HEADER DEFAULTS
export const SectionHeadingBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 20px;
`;

// 8. INSIGHTS SECTION (FOOTER BANNER)
export const InsightsSection = styled.section`
  padding: 80px 24px;
  background-color: ${colors.neutral.white};
`;

export const InsightsCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, ${colors.primary.default} 0%, ${colors.primary.hover} 100%);
  border-radius: 28px;
  padding: 60px 48px;
  color: ${colors.neutral.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 50px rgba(${colors.rgb.primary}, 0.25);
  flex-wrap: wrap;
  gap: 32px;

  ${media.tablet} {
    padding: 40px 24px;
  }
`;

export const InsightsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
`;

export const InsightsLabel = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InsightsTitle = styled.h3`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -1px;
  margin: 0;

  ${media.tablet} {
    font-size: 24px;
  }
`;

export const InsightsButton = styled.button`
  background: ${colors.neutral.white};
  color: ${colors.primary.default};
  border: none;
  font-size: 15px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  height: fit-content;

  &:hover {
    transform: translateY(-2px);
    background: ${colors.neutral.slate50};
  }

  &:focus-visible {
    outline: 2px solid ${colors.neutral.white};
    outline-offset: 3px;
  }
`;
