'use client';

import React, { useState } from 'react';
import { Star, ArrowRight, Play, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { mockUser, mockTestimonials, serviceCategories, careTimelineSteps, mockDoctorProfiles } from '../../data/dummy-data';
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

interface HomeProps {
  onNavigateToAuth: () => void;
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
              <HeroBadge>Introducing AI Dental Support</HeroBadge>
              <HeroTitle>
                Family-Friendly <span>Dental Care</span>
              </HeroTitle>
              <HeroSubtitle>
                Permanent natural-looking solutions to replace missing teeth and restore confident healthy smiles.
              </HeroSubtitle>
              <HeroActions>
                <HeroPrimaryButton onClick={handleCTA}>
                  Book a Appointment <ArrowRight size={16} />
                </HeroPrimaryButton>
                <HeroSecondaryButton onClick={handleCTA}>
                  Book a Call
                </HeroSecondaryButton>
              </HeroActions>

              <QuickSelectTabs>
                {serviceCategories.map((cat) => (
                  <QuickTab
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    style={{
                      backgroundColor: activeTab === cat.id ? '#ffffff' : 'rgba(255,255,255,0.1)',
                      color: activeTab === cat.id ? '#0f172a' : '#ffffff'
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
                  <VideoCardText>Restore natural healthy confident dental growth.</VideoCardText>
                  <VideoCardRating>
                    <Star size={10} fill="currentColor" /> 4.9 [Rating]
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
              <StepNumber>{step.step}</StepNumber>
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
              <SectionBadgeLabel>About Us</SectionBadgeLabel>
              <SectionTitleHeader>
                We deliver personalized dental treatments with modern <span>technology</span> and gentle care.
              </SectionTitleHeader>
              <SectionParagraph>
                Rik Dental Care Center integrates cutting-edge technology with general, restorative, and orthodontic expertise. Our state-of-the-art facility features 3D imaging, digital diagnostics, and an AI-driven support portal to ensure comfortable, efficient care for patients of all ages.
              </SectionParagraph>

              <AboutMetricsRow>
                <MetricItem>
                  <MetricNum>98%</MetricNum>
                  <MetricName>Satisfaction Rate</MetricName>
                </MetricItem>
                <MetricItem>
                  <MetricNum>2k+</MetricNum>
                  <MetricName>Smiles Transformed</MetricName>
                </MetricItem>
                <MetricItem>
                  <MetricNum>4.9*</MetricNum>
                  <MetricName>Customer Rating</MetricName>
                </MetricItem>
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
              <SectionBadgeLabel>Feature Treatment</SectionBadgeLabel>
              <SectionTitleHeader>Advanced Dental Care for a Healthier Smile</SectionTitleHeader>
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
                      Book Appointment <ArrowRight size={14} />
                    </DoctorCardButton>
                  </DoctorCardDetails>
                </DoctorProfileCard>
              ))}

              <StatsHighlightColumn>
                <InfoStatCard>
                  <InfoStatLabel>Recommended Checkups per year</InfoStatLabel>
                  <InfoStatNumber>2 Visits</InfoStatNumber>
                </InfoStatCard>
                <InfoStatCard>
                  <InfoStatLabel>Average Treatment Time</InfoStatLabel>
                  <InfoStatNumber>40 Mins</InfoStatNumber>
                </InfoStatCard>
                <ProgressTrackerCard>
                  <TrackerMeta>
                    <TrackerTitle>Today's Appointment Progress</TrackerTitle>
                    <TrackerPercent>68%</TrackerPercent>
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
              Why Choose <span>Precision Dental?</span>
            </SectionTitleHeader>
          </SectionHeadingBlock>

          <WhyChooseGrid>
            <PhotoFeatureCard>
              <PhotoCardTitle>Complete Oral Care Solutions</PhotoCardTitle>
            </PhotoFeatureCard>

            <TealFeatureCard>
              <TealCardBadge>Rewards</TealCardBadge>
              <TealCardTitle>
                Maintain your preventive care streak and earn exclusive rewards.
              </TealCardTitle>
              <TealCardDesc>
                Get special discounts on whitening packages and cosmetic treatments by completing scheduled biannual hygiene cleanings.
              </TealCardDesc>
            </TealFeatureCard>

            <ChartFeatureCard>
              <ChartCardHeader>
                <div>
                  <ChartCardTitle>Radiation-Free</ChartCardTitle>
                  <ChartCardDesc>Health Diagnostics</ChartCardDesc>
                </div>
                <ChartMetricNum>98%</ChartMetricNum>
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
              <SectionBadgeLabel style={{ marginBottom: '12px' }}>Testimonials</SectionBadgeLabel>
              <SectionTitleHeader>What Our Patients Say</SectionTitleHeader>
            </div>
          </SectionHeadingBlock>

          <CarouselContainer>
            <QuoteIconWrapper>
              <Quote size={80} fill="currentColor" opacity={0.1} />
            </QuoteIconWrapper>

            <CarouselBodyText>
              "{currentTestimonial.text}"
            </CarouselBodyText>

            <CarouselMeta>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                  {currentTestimonial.name}
                </span>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
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
              <InsightsLabel>Our Insights</InsightsLabel>
              <InsightsTitle>
                Advanced Dental Care Ensures Precision Comfort And Long Lasting Healthy Smiles.
              </InsightsTitle>
            </InsightsContent>
            <InsightsButton onClick={handleCTA}>
              Book a Call
            </InsightsButton>
          </InsightsCard>
        </InsightsSection>
      </SectionAnchor>
    </HomeWrapper>
  );
};

export default Home;
