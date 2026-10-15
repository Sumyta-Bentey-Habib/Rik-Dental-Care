import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/colors';
import { media } from '@/constants/breakpoints';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HomeWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.neutral.white};
  color: ${colors.neutral.slate900};
  display: flex;
  flex-direction: column;
`;

export const SectionAnchor = styled.div`
  scroll-margin-top: 72px;
`;

// ==========================================
// 1. HERO SECTION
// ==========================================
export const HeroSection = styled.section`
  padding: 80px 24px 72px;
  background: linear-gradient(180deg, ${colors.neutral.white} 0%, ${colors.neutral.slate50} 100%);
  border-bottom: 1px solid ${colors.neutral.slate200};
  position: relative;
  overflow: hidden;

  ${media.tablet} {
    padding: 48px 20px 48px;
  }
`;

export const HeroInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;

  ${media.desktop} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const HeroBadge = styled.span`
  background: ${colors.secondary.surface};
  border: 1px solid ${colors.secondary.surfaceBorder};
  color: ${colors.primary.dark};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.2px;
`;

export const HeroTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin: 0 0 20px 0;
  color: ${colors.headings};

  span {
    color: ${colors.primary.default};
  }

  ${media.desktop} {
    font-size: 44px;
  }

  ${media.mobile} {
    font-size: 34px;
    letter-spacing: -0.8px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: ${colors.neutral.slate600};
  margin: 0 0 32px 0;
  max-width: 580px;

  ${media.mobile} {
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
  flex-wrap: wrap;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const HeroPrimaryButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 28px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.25);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${colors.primary.hover};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(${colors.rgb.primary}, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 3px;
  }
`;

export const HeroSecondaryButton = styled.button`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  color: ${colors.headings};
  font-size: 15px;
  font-weight: 700;
  padding: 15px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${colors.secondary.surfaceLight};
    border-color: ${colors.secondary.surfaceBorder};
    color: ${colors.primary.default};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 3px;
  }
`;

export const HeroTrustGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid ${colors.neutral.slate200};

  ${media.mobile} {
    flex-direction: column;
    gap: 12px;
  }
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate700};

  svg {
    color: ${colors.primary.default};
    flex-shrink: 0;
  }
`;

export const HeroRight = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  animation: ${fadeIn} 0.7s ease-out;
`;

export const HeroImageCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  min-height: 340px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(${colors.rgb.slate900}, 0.1);
  border: 1px solid ${colors.neutral.slate200};
  background-color: ${colors.neutral.slate100};

  img {
    object-fit: cover;
  }

  ${media.mobile} {
    min-height: 240px;
    border-radius: 18px;
  }
`;

export const HeroFloatingBadge = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(${colors.rgb.white}, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(${colors.rgb.slate200}, 0.8);
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(${colors.rgb.slate900}, 0.08);

  ${media.mobileSm} {
    left: 12px;
    right: 12px;
    bottom: 12px;
    padding: 10px 14px;
  }
`;

export const FloatingBadgeIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${colors.secondary.surface};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const FloatingBadgeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FloatingBadgeTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.headings};
`;

export const FloatingBadgeSubtitle = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${colors.neutral.slate500};
`;

// ==========================================
// 2. TIMELINE / JOURNEY SECTION
// ==========================================
export const TimelineSection = styled.section`
  background: ${colors.neutral.white};
  border-bottom: 1px solid ${colors.neutral.slate200};
  padding: 36px 24px;
`;

export const TimelineInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const TimelineStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  background: ${colors.neutral.slate50};
  border: 1px solid ${colors.neutral.slate200};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.secondary.surfaceBorder};
    background: ${colors.secondary.surfaceLight};
    transform: translateY(-2px);
  }
`;

export const StepNumber = styled.span`
  color: ${colors.primary.default};
  background: ${colors.secondary.surface};
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StepTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.headings};
`;

export const StepDesc = styled.span`
  font-size: 12px;
  line-height: 1.4;
  color: ${colors.neutral.slate500};
`;

// ==========================================
// 3. ABOUT SECTION
// ==========================================
export const AboutSection = styled.section`
  padding: 96px 24px;
  background-color: ${colors.neutral.white};

  ${media.tablet} {
    padding: 64px 20px;
  }
`;

export const AboutInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;

  ${media.desktop} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const AboutVisualGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  position: relative;
  align-items: center;

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const VisualCard = styled.div`
  border-radius: 20px;
  overflow: hidden;
  background: ${colors.neutral.slate100};
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid ${colors.neutral.slate200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardHeightOne = styled(VisualCard)`
  height: 320px;

  ${media.mobile} {
    height: 220px;
  }
`;

export const CardHeightTwo = styled(VisualCard)`
  height: 240px;

  ${media.mobile} {
    height: 180px;
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionBadgeLabel = styled.span`
  background: ${colors.secondary.surface};
  color: ${colors.primary.dark};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid ${colors.secondary.surfaceBorder};
`;

export const SectionTitleHeader = styled.h2`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.2;
  color: ${colors.headings};
  letter-spacing: -0.8px;
  margin: 0;

  span {
    color: ${colors.primary.default};
  }

  ${media.mobile} {
    font-size: 28px;
  }
`;

export const SectionParagraph = styled.p`
  font-size: 16px;
  line-height: 1.65;
  color: ${colors.neutral.slate600};
  margin: 0;
`;

export const AboutMetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 12px;
  border-top: 1px solid ${colors.neutral.slate200};
  padding-top: 24px;

  ${media.mobileSm} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export const LearnMoreButton = styled.button`
  background: transparent;
  color: ${colors.primary.default};
  border: 1px solid ${colors.primary.default};
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-top: 8px;

  &:hover {
    background: ${colors.secondary.surface};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

// ==========================================
// 4. SERVICES SECTION
// ==========================================
export const ServicesSection = styled.section`
  padding: 96px 24px;
  background-color: ${colors.neutral.slate50};
  border-top: 1px solid ${colors.neutral.slate200};
  border-bottom: 1px solid ${colors.neutral.slate200};

  ${media.tablet} {
    padding: 64px 20px;
  }
`;

export const ServicesInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const SectionHeaderCentered = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const SectionSubtitleText = styled.p`
  font-size: 16px;
  line-height: 1.55;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const ServicesCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 20px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;

  &:hover {
    border-color: ${colors.primary.default};
    box-shadow: 0 12px 28px rgba(${colors.rgb.primary}, 0.08);
    transform: translateY(-3px);
  }
`;

export const ServiceCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ServiceIconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${colors.secondary.surface};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ServiceRating = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.primary.dark};
  background: ${colors.secondary.surfaceLight};
  border: 1px solid ${colors.secondary.surfaceBorder};
  padding: 4px 10px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  svg {
    color: #f59e0b;
  }
`;

export const ServiceTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
`;

export const ServiceDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.neutral.slate500};
  margin: 0;
  flex: 1;
`;

export const ServiceCardAction = styled.button`
  background: transparent;
  color: ${colors.primary.default};
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.2s ease;
  width: fit-content;

  &:hover {
    gap: 12px;
    color: ${colors.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

// ==========================================
// 5. SPECIALISTS SECTION
// ==========================================
export const SpecialistsSection = styled.section`
  padding: 96px 24px;
  background-color: ${colors.neutral.white};

  ${media.tablet} {
    padding: 64px 20px;
  }
`;

export const SpecialistsInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const SpecialistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const SpecialistCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${colors.secondary.surfaceBorder};
    box-shadow: 0 14px 32px rgba(${colors.rgb.primary}, 0.08);
  }
`;

export const SpecialistImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-color: ${colors.neutral.slate100};

  img {
    object-fit: cover;
  }
`;

export const SpecialistDetails = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const DocHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DocName = styled.h4`
  font-size: 19px;
  font-weight: 800;
  color: ${colors.headings};
  margin: 0;
`;

export const DocRole = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.primary.default};
`;

export const DocRatingPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: ${colors.headings};

  svg {
    color: #f59e0b;
  }

  span {
    font-size: 12px;
    font-weight: 500;
    color: ${colors.neutral.slate500};
  }
`;

export const DocSpecialtiesRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const SpecialtyPill = styled.span`
  background: ${colors.secondary.surface};
  color: ${colors.primary.dark};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
`;

export const DocBookBtn = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${colors.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

export const ViewAllSpecialistsLink = styled.button`
  align-self: center;
  background: transparent;
  color: ${colors.primary.default};
  border: 1px solid ${colors.neutral.slate200};
  font-size: 14px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${colors.secondary.surface};
    border-color: ${colors.secondary.surfaceBorder};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

// ==========================================
// 6. WHY CHOOSE SECTION
// ==========================================
export const WhyChooseSection = styled.section`
  padding: 96px 24px;
  background-color: ${colors.neutral.slate50};
  border-top: 1px solid ${colors.neutral.slate200};
  border-bottom: 1px solid ${colors.neutral.slate200};

  ${media.tablet} {
    padding: 64px 20px;
  }
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
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 18px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${colors.secondary.surfaceBorder};
    box-shadow: 0 8px 24px rgba(${colors.rgb.primary}, 0.06);
    transform: translateY(-3px);
  }
`;

export const FeatureIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${colors.secondary.surface};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureTitle = styled.h4`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
`;

export const FeatureDesc = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

// ==========================================
// 7. TESTIMONIALS SECTION
// ==========================================
export const TestimonialSection = styled.section`
  padding: 96px 24px;
  background-color: ${colors.neutral.white};

  ${media.tablet} {
    padding: 64px 20px;
  }
`;

export const CarouselContainer = styled.div`
  max-width: 820px;
  margin: 0 auto;
  background: ${colors.neutral.slate50};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

  ${media.mobile} {
    padding: 28px 20px;
  }
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 4px;
  color: #f59e0b;
`;

export const CarouselBodyText = styled.p`
  font-size: 20px;
  line-height: 1.6;
  font-weight: 600;
  color: ${colors.headings};
  font-style: italic;
  margin: 0;

  ${media.mobile} {
    font-size: 16px;
  }
`;

export const CarouselMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.neutral.slate200};
  padding-top: 20px;

  ${media.mobileSm} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const CarouselArrows = styled.div`
  display: flex;
  gap: 10px;
`;

export const ArrowBtn = styled.button`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
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
    border-color: ${colors.primary.default};
    background: ${colors.secondary.surfaceLight};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

// ==========================================
// 8. CLINIC INFO & HOURS SECTION
// ==========================================
export const ClinicInfoSection = styled.section`
  padding: 80px 24px;
  background-color: ${colors.neutral.slate50};
  border-top: 1px solid ${colors.neutral.slate200};
`;

export const ClinicInfoInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;

  ${media.desktop} {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 20px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);

  ${media.mobile} {
    padding: 24px;
  }
`;

export const InfoCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${colors.primary.default};
  }
`;

export const HoursTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed ${colors.neutral.slate200};
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`;

export const HoursDay = styled.span`
  font-weight: 600;
  color: ${colors.neutral.slate700};
`;

export const HoursTime = styled.span`
  color: ${colors.primary.default};
  font-weight: 700;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: ${colors.neutral.slate600};

  svg {
    color: ${colors.primary.default};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

export const EmergencyAlertCallout = styled.div`
  background: ${colors.emergency.red50};
  border: 1px solid ${colors.emergency.red150};
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const EmergencyAlertText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.emergency.red900};
`;

export const EmergencyDeskButton = styled.button`
  background: ${colors.emergency.red700};
  color: ${colors.neutral.white};
  border: none;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.emergency.red800};
  }

  &:focus-visible {
    outline: 2px solid ${colors.emergency.red500};
    outline-offset: 2px;
  }
`;

// ==========================================
// 9. CONSULTATION CTA BANNER
// ==========================================
export const InsightsSection = styled.section`
  padding: 80px 24px;
  background-color: ${colors.neutral.white};
`;

export const InsightsCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, ${colors.primary.default} 0%, ${colors.primary.hover} 100%);
  border-radius: 28px;
  padding: 56px 48px;
  color: ${colors.neutral.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 16px 40px rgba(${colors.rgb.primary}, 0.22);
  flex-wrap: wrap;
  gap: 32px;

  ${media.tablet} {
    padding: 36px 24px;
  }
`;

export const InsightsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 620px;
`;

export const InsightsLabel = styled.span`
  color: ${colors.secondary.surface};
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const InsightsTitle = styled.h3`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.8px;
  margin: 0;

  ${media.tablet} {
    font-size: 24px;
  }
`;

export const InsightsSubtitle = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

export const InsightsActions = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  ${media.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

export const InsightsButton = styled.button`
  background: ${colors.neutral.white};
  color: ${colors.primary.default};
  border: none;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 28px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    background: ${colors.secondary.surfaceLight};
  }

  &:focus-visible {
    outline: 2px solid ${colors.neutral.white};
    outline-offset: 3px;
  }
`;

export const InsightsSecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: ${colors.neutral.white};
  font-size: 15px;
  font-weight: 700;
  padding: 15px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.neutral.white};
    outline-offset: 3px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
`;

export const AuthorRole = styled.div`
  font-size: 13px;
  color: ${colors.neutral.slate500};
`;

export const EmergencyAlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ContactButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
`;

export const ContactPrimaryButton = styled.button`
  flex: 1;
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

export const ContactSecondaryButton = styled.button`
  flex: 1;
  background: ${colors.neutral.white};
  color: ${colors.status.error};
  border: 1px solid ${colors.status.errorBorder};
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${colors.status.errorSurface};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.status.error};
    outline-offset: 2px;
  }
`;

