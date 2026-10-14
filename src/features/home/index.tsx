'use client';

import React, { useState } from 'react';
import { Star, ArrowRight, Play, Quote, ChevronLeft, ChevronRight, Smile, ClipboardList, Stethoscope, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { mockTestimonials, serviceCategories, careTimelineSteps, mockDoctorProfiles } from '@/data/dummy-data';
import { colors } from '@/constants/colors';
import {
  HOME_HERO,
  HOME_ABOUT,
  HOME_SERVICES,
  HOME_WHY_CHOOSE,
  HOME_TESTIMONIALS,
  HOME_INSIGHTS,
} from '@/constants/constants';
import {
  HomeWrapper,
  SectionAnchor,
  HeroSection,
  HeroInner,
  HeroLeft,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroPrimaryButton,
  HeroSecondaryButton,
  HeroRight,
  FloatingVideoCard,
  VideoThumbnailWrapper,
  PlayButtonOverlay,
  VideoCardMeta,
  VideoCardText,
  VideoCardRating,
  QuickSelectTabs,
  QuickTab,
  TimelineSection,
  TimelineInner,
  TimelineStep,
  StepNumber,
  StepText,
  AboutSection,
  AboutInner,
  AboutVisualGrid,
  CardHeightOne,
  CardHeightTwo,
  AboutContent,
  SectionBadgeLabel,
  SectionTitleHeader,
  SectionParagraph,
  AboutMetricsRow,
  MetricItem,
  MetricNum,
  MetricName,
  AdvancedSection,
  AdvancedInner,
  AdvancedHeaderBlock,
  AdvancedGrid,
  DoctorProfileCard,
  DoctorImageWrapper,
  DoctorCardDetails,
  DocName,
  DocRole,
  DocRatingRow,
  DocBio,
  DoctorCardButton,
  StatsHighlightColumn,
  InfoStatCard,
  InfoStatLabel,
  InfoStatNumber,
  ProgressTrackerCard,
  TrackerMeta,
  TrackerTitle,
  TrackerPercent,
  DotBarChart,
  DotBarLine,
  WhyChooseSection,
  WhyChooseInner,
  WhyChooseGrid,
  PhotoFeatureCard,
  PhotoCardTitle,
  TealFeatureCard,
  TealCardTitle,
  TealCardDesc,
  TealCardBadge,
  ChartFeatureCard,
  ChartCardHeader,
  ChartCardTitle,
  ChartCardDesc,
  ChartMetricNum,
  MicroBarGrid,
  MicroBarElement,
  TestimonialSection,
  CarouselContainer,
  QuoteIconWrapper,
  CarouselBodyText,
  CarouselMeta,
  CarouselArrows,
  ArrowBtn,
  SectionHeadingBlock,
  InsightsSection,
  InsightsCard,
  InsightsContent,
  InsightsLabel,
  InsightsTitle,
  InsightsButton
} from './style';

const getStepIcon = (step: string) => {
  switch (step) {
    case '01':
      return <Smile size={16} />;
    case '02':
      return <ClipboardList size={16} />;
    case '03':
      return <Stethoscope size={16} />;
    case '04':
      return <ShieldCheck size={16} />;
    default:
      return null;
  }
};

interface HomeProps {
  onNavigateToAuth: (mode?: 'login' | 'register') => void;
  onNavigateToChat: () => void;
  isLoggedIn: boolean;
}

export const Home: React.FC<HomeProps> = ({
  onNavigateToAuth,
  onNavigateToChat,
  isLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState('checkup');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleCTA = () => {
    if (isLoggedIn) {
      onNavigateToChat();
    } else {
      onNavigateToAuth();
    }
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const currentTestimonial = mockTestimonials[testimonialIndex];

  // Micro progress chart static heights
  const chartBars = [
    { h: '30%', a: true },
    { h: '45%', a: true },
    { h: '55%', a: true },
    { h: '70%', a: true },
    { h: '85%', a: true },
    { h: '95%', a: true },
    { h: '60%', a: true },
    { h: '75%', a: true },
    { h: '88%', a: true },
    { h: '92%', a: true },
    { h: '40%', a: false },
    { h: '30%', a: false },
    { h: '25%', a: false },
    { h: '15%', a: false },
    { h: '10%', a: false }
  ];

  // Radiation Diagnostics micro chart bar heights
  const microBars = ['35%', '50%', '65%', '85%', '98%', '70%', '45%'];

  return (
    <HomeWrapper>
      {/* 1. HERO SECTION */}
      <SectionAnchor id="hero">
        <HeroSection>
          <HeroInner>
            <HeroLeft>
              <HeroBadge>{HOME_HERO.badge}</HeroBadge>
              <HeroTitle>
                {HOME_HERO.titleFirst} <span>{HOME_HERO.titleSecond}</span>
              </HeroTitle>
              <HeroSubtitle>
                {HOME_HERO.subtitle}
              </HeroSubtitle>
              <HeroActions>
                <HeroPrimaryButton onClick={handleCTA}>
                  {HOME_HERO.primaryBtn} <ArrowRight size={16} />
                </HeroPrimaryButton>
                <HeroSecondaryButton onClick={handleCTA}>
                  {HOME_HERO.secondaryBtn}
                </HeroSecondaryButton>
              </HeroActions>

              <QuickSelectTabs>
                {serviceCategories.map((cat) => (
                  <QuickTab
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    style={{
                      backgroundColor: activeTab === cat.id ? colors.neutral.white : `rgba(${colors.rgb.white}, 0.1)`,
                      color: activeTab === cat.id ? colors.neutral.slate900 : colors.neutral.white
                    }}
                  >
                    {cat.name}
                  </QuickTab>
                ))}
              </QuickSelectTabs>
            </HeroLeft>

            <HeroRight>
              <FloatingVideoCard>
                <VideoThumbnailWrapper>
                  <Image
                    src="/hero-dentistry.png"
                    alt="Video thumbnail"
                    fill
                  />
                  <PlayButtonOverlay>
                    <Play size={10} fill="currentColor" />
                  </PlayButtonOverlay>
                </VideoThumbnailWrapper>
                <VideoCardMeta>
                  <VideoCardText>{HOME_HERO.videoMeta}</VideoCardText>
                  <VideoCardRating>
                    <Star size={10} fill="currentColor" /> {HOME_HERO.videoRating}
                  </VideoCardRating>
                </VideoCardMeta>
              </FloatingVideoCard>
            </HeroRight>
          </HeroInner>
        </HeroSection>
      </SectionAnchor>

      {/* 2. CARE TIMELINE SECTION */}
      <TimelineSection>
        <TimelineInner>
          {careTimelineSteps.map((step) => (
            <TimelineStep key={step.step}>
              <StepNumber>{getStepIcon(step.step)}</StepNumber>
              <StepText>{step.name}</StepText>
            </TimelineStep>
          ))}
        </TimelineInner>
      </TimelineSection>

      {/* 3. ABOUT US SECTION */}
      <SectionAnchor id="about">
        <AboutSection>
          <AboutInner>
            <AboutVisualGrid>
              <CardHeightOne>
                <Image
                  src="/hero-dentistry.png"
                  alt="Dental checkup"
                  fill
                />
              </CardHeightOne>
              <CardHeightTwo>
                <Image
                  src="/dental-chair.png"
                  alt="Dental clinic room"
                  fill
                />
              </CardHeightTwo>
            </AboutVisualGrid>

            <AboutContent>
              <SectionBadgeLabel>{HOME_ABOUT.badge}</SectionBadgeLabel>
              <SectionTitleHeader>
                {HOME_ABOUT.titleFirst} <span>{HOME_ABOUT.titleSpan}</span> {HOME_ABOUT.titleSecond}
              </SectionTitleHeader>
              <SectionParagraph>
                {HOME_ABOUT.paragraph}
              </SectionParagraph>

              <AboutMetricsRow>
                {HOME_ABOUT.metrics.map((metric, i) => (
                  <MetricItem key={i}>
                    <MetricNum>{metric.num}</MetricNum>
                    <MetricName>{metric.label}</MetricName>
                  </MetricItem>
                ))}
              </AboutMetricsRow>
            </AboutContent>
          </AboutInner>
        </AboutSection>
      </SectionAnchor>

      {/* 4. ADVANCED CARE / SERVICES SECTION */}
      <SectionAnchor id="services">
        <AdvancedSection>
          <AdvancedInner>
            <AdvancedHeaderBlock>
              <SectionBadgeLabel>{HOME_SERVICES.badge}</SectionBadgeLabel>
              <SectionTitleHeader>{HOME_SERVICES.title}</SectionTitleHeader>
            </AdvancedHeaderBlock>

            <AdvancedGrid>
              {mockDoctorProfiles.map((doc) => (
                <DoctorProfileCard key={doc.id}>
                  <DoctorImageWrapper>
                    <Image
                      src={doc.avatarUrl}
                      alt={doc.name}
                      width={200}
                      height={240}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </DoctorImageWrapper>
                  <DoctorCardDetails>
                    <div>
                      <DocName>{doc.name}</DocName>
                      <DocRole>{doc.role}</DocRole>
                    </div>
                    <DocRatingRow>
                      <Star size={14} fill="currentColor" /> {doc.rating} ({doc.reviewsCount}+ reviews)
                    </DocRatingRow>
                    <DocBio>{doc.bio}</DocBio>
                    <DoctorCardButton onClick={handleCTA}>
                      {HOME_SERVICES.bookBtn} <ArrowRight size={14} />
                    </DoctorCardButton>
                  </DoctorCardDetails>
                </DoctorProfileCard>
              ))}

              <StatsHighlightColumn>
                <InfoStatCard>
                  <InfoStatLabel>{HOME_SERVICES.checkupsLabel}</InfoStatLabel>
                  <InfoStatNumber>{HOME_SERVICES.checkupsVal}</InfoStatNumber>
                </InfoStatCard>
                <InfoStatCard>
                  <InfoStatLabel>{HOME_SERVICES.timeLabel}</InfoStatLabel>
                  <InfoStatNumber>{HOME_SERVICES.timeVal}</InfoStatNumber>
                </InfoStatCard>
                <ProgressTrackerCard>
                  <TrackerMeta>
                    <TrackerTitle>{HOME_SERVICES.progressTitle}</TrackerTitle>
                    <TrackerPercent>{HOME_SERVICES.progressVal}</TrackerPercent>
                  </TrackerMeta>
                  <DotBarChart>
                    {chartBars.map((bar, i) => (
                      <DotBarLine
                        key={i}
                        $height={bar.h}
                        $active={bar.a}
                      />
                    ))}
                  </DotBarChart>
                </ProgressTrackerCard>
              </StatsHighlightColumn>
            </AdvancedGrid>
          </AdvancedInner>
        </AdvancedSection>
      </SectionAnchor>

      {/* 5. WHY CHOOSE PRECISION DENTAL */}
      <WhyChooseSection>
        <WhyChooseInner>
          <SectionHeadingBlock>
            <SectionTitleHeader>
              {HOME_WHY_CHOOSE.titleFirst} <span>{HOME_WHY_CHOOSE.titleSpan}</span>
            </SectionTitleHeader>
          </SectionHeadingBlock>

          <WhyChooseGrid>
            <PhotoFeatureCard>
              <PhotoCardTitle>{HOME_WHY_CHOOSE.featureCardTitle}</PhotoCardTitle>
            </PhotoFeatureCard>

            <TealFeatureCard>
              <TealCardBadge>{HOME_WHY_CHOOSE.rewardsBadge}</TealCardBadge>
              <TealCardTitle>
                {HOME_WHY_CHOOSE.rewardsTitle}
              </TealCardTitle>
              <TealCardDesc>
                {HOME_WHY_CHOOSE.rewardsDesc}
              </TealCardDesc>
            </TealFeatureCard>

            <ChartFeatureCard>
              <ChartCardHeader>
                <div>
                  <ChartCardTitle>{HOME_WHY_CHOOSE.radFreeTitle}</ChartCardTitle>
                  <ChartCardDesc>{HOME_WHY_CHOOSE.radFreeDesc}</ChartCardDesc>
                </div>
                <ChartMetricNum>{HOME_WHY_CHOOSE.radFreeMetric}</ChartMetricNum>
              </ChartCardHeader>
              <MicroBarGrid>
                {microBars.map((h, i) => (
                  <MicroBarElement key={i} $height={h} />
                ))}
              </MicroBarGrid>
            </ChartFeatureCard>
          </WhyChooseGrid>
        </WhyChooseInner>
      </WhyChooseSection>

      {/* 6. TESTIMONIAL CAROUSEL */}
      <SectionAnchor id="testimonials">
        <TestimonialSection>
          <SectionHeadingBlock style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SectionBadgeLabel style={{ marginBottom: '12px' }}>{HOME_TESTIMONIALS.badge}</SectionBadgeLabel>
              <SectionTitleHeader>{HOME_TESTIMONIALS.title}</SectionTitleHeader>
            </div>
          </SectionHeadingBlock>

          <CarouselContainer>
            <QuoteIconWrapper>
              <Quote size={80} fill="currentColor" opacity={0.1} />
            </QuoteIconWrapper>

            <CarouselBodyText>
              &ldquo;{currentTestimonial.text}&rdquo;
            </CarouselBodyText>

            <CarouselMeta>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: colors.neutral.slate900 }}>
                  {currentTestimonial.name}
                </span>
                <span style={{ fontSize: '13px', color: colors.neutral.slate500, fontWeight: 500 }}>
                  {currentTestimonial.role}
                </span>
              </div>

              <CarouselArrows>
                <ArrowBtn onClick={handlePrevTestimonial}>
                  <ChevronLeft size={18} />
                </ArrowBtn>
                <ArrowBtn onClick={handleNextTestimonial}>
                  <ChevronRight size={18} />
                </ArrowBtn>
              </CarouselArrows>
            </CarouselMeta>
          </CarouselContainer>
        </TestimonialSection>
      </SectionAnchor>

      {/* 7. INSIGHTS SECTION (CTA BANNER) */}
      <SectionAnchor id="contact">
        <InsightsSection>
          <InsightsCard>
            <InsightsContent>
              <InsightsLabel>{HOME_INSIGHTS.badge}</InsightsLabel>
              <InsightsTitle>
                {HOME_INSIGHTS.title}
              </InsightsTitle>
            </InsightsContent>
            <InsightsButton onClick={handleCTA}>
              {HOME_INSIGHTS.btn}
            </InsightsButton>
          </InsightsCard>
        </InsightsSection>
      </SectionAnchor>
    </HomeWrapper>
  );
};

export default Home;
