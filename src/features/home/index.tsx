'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Smile,
  ClipboardList,
  Stethoscope,
  Sparkles,
  Award,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import {
  serviceCategories,
  careTimelineSteps,
  mockTestimonials,
} from '@/data/dummy-data';
import {
  HOME_HERO,
  HOME_ABOUT,
  HOME_SERVICES,
  HOME_SPECIALISTS_SECTION,
  HOME_WHY_CHOOSE,
  HOME_CLINIC_INFO,
  HOME_TESTIMONIALS,
  HOME_INSIGHTS,
  SPECIALISTS_LIST,
  OPENING_HOURS,
  CONTACT_INFO,
} from '@/constants/constants';
import { ToothIcon, ShieldIcon } from '@/components/icons';
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
  HeroTrustGrid,
  TrustItem,
  HeroRight,
  HeroImageCard,
  HeroFloatingBadge,
  FloatingBadgeIcon,
  FloatingBadgeText,
  FloatingBadgeTitle,
  FloatingBadgeSubtitle,
  TimelineSection,
  TimelineInner,
  TimelineStep,
  StepNumber,
  StepContent,
  StepTitle,
  StepDesc,
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
  LearnMoreButton,
  ServicesSection,
  ServicesInner,
  SectionHeaderCentered,
  SectionSubtitleText,
  ServicesCardsGrid,
  ServiceCard,
  ServiceCardHeader,
  ServiceIconCircle,
  ServiceRating,
  ServiceTitle,
  ServiceDescription,
  ServiceCardAction,
  SpecialistsSection,
  SpecialistsInner,
  SpecialistsGrid,
  SpecialistCard,
  SpecialistImageWrapper,
  SpecialistDetails,
  DocHeaderGroup,
  DocName,
  DocRole,
  DocRatingPill,
  DocSpecialtiesRow,
  SpecialtyPill,
  DocBookBtn,
  ViewAllSpecialistsLink,
  WhyChooseSection,
  WhyChooseInner,
  WhyChooseGrid,
  FeatureCard,
  FeatureIconBox,
  FeatureTitle,
  FeatureDesc,
  TestimonialSection,
  CarouselContainer,
  StarsRow,
  CarouselBodyText,
  CarouselMeta,
  CarouselArrows,
  ArrowBtn,
  ClinicInfoSection,
  ClinicInfoInner,
  InfoCard,
  InfoCardTitle,
  HoursTable,
  HoursRow,
  HoursDay,
  HoursTime,
  ContactItem,
  EmergencyAlertCallout,
  EmergencyAlertHeader,
  EmergencyAlertText,
  EmergencyDeskButton,
  ContactButtonGroup,
  ContactPrimaryButton,
  ContactSecondaryButton,
  AuthorInfo,
  AuthorName,
  AuthorRole,
  InsightsSection,
  InsightsCard,
  InsightsContent,
  InsightsLabel,
  InsightsTitle,
  InsightsSubtitle,
  InsightsActions,
  InsightsButton,
  InsightsSecondaryButton,
} from './style';

const getStepIcon = (step: string) => {
  switch (step) {
    case '01':
      return <Smile size={18} />;
    case '02':
      return <ClipboardList size={18} />;
    case '03':
      return <Stethoscope size={18} />;
    case '04':
      return <ShieldCheck size={18} />;
    default:
      return null;
  }
};

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'checkup':
      return <Stethoscope size={22} />;
    case 'cleaning':
      return <Sparkles size={22} />;
    case 'filling':
      return <ToothIcon size={22} />;
    case 'gum':
      return <ShieldIcon size={22} />;
    case 'retainers':
      return <Smile size={22} />;
    default:
      return <ToothIcon size={22} />;
  }
};

const getWhyChooseIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Sparkles size={22} />;
    case 1:
      return <Smile size={22} />;
    case 2:
      return <Stethoscope size={22} />;
    case 3:
      return <ShieldCheck size={22} />;
    default:
      return <CheckCircle2Icon />;
  }
};

const CheckCircle2Icon = () => <ShieldCheck size={22} />;

interface HomeProps {
  onNavigateToAuth: (mode?: 'login' | 'register') => void;
  onNavigateToChat: () => void;
  onNavigateToSpecialists?: () => void;
  onNavigateToEmergency?: () => void;
  onNavigateToDashboard?: () => void;
  isLoggedIn: boolean;
}

export const Home: React.FC<HomeProps> = ({
  onNavigateToAuth,
  onNavigateToChat,
  onNavigateToSpecialists,
  onNavigateToEmergency,
  onNavigateToDashboard,
  isLoggedIn,
}) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleBooking = () => {
    if (isLoggedIn && onNavigateToDashboard) {
      onNavigateToDashboard();
    } else {
      onNavigateToAuth('register');
    }
  };

  const handleSpecialists = () => {
    if (onNavigateToSpecialists) {
      onNavigateToSpecialists();
    } else {
      window.location.href = '/specialists';
    }
  };

  const handleEmergency = () => {
    if (onNavigateToEmergency) {
      onNavigateToEmergency();
    } else {
      window.location.href = '/emergency';
    }
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  const currentTestimonial = mockTestimonials[testimonialIndex];

  return (
    <HomeWrapper>
      {/* 1. HERO SECTION */}
      <SectionAnchor id="hero">
        <HeroSection>
          <HeroInner>
            <HeroLeft>
              <HeroBadge>
                <Award size={16} />
                {HOME_HERO.badge}
              </HeroBadge>
              <HeroTitle>
                {HOME_HERO.titleFirst} <span>{HOME_HERO.titleSecond}</span>
              </HeroTitle>
              <HeroSubtitle>
                {HOME_HERO.subtitle}
              </HeroSubtitle>
              <HeroActions>
                <HeroPrimaryButton onClick={handleBooking}>
                  <Calendar size={18} />
                  {HOME_HERO.primaryBtn}
                  <ArrowRight size={16} />
                </HeroPrimaryButton>
                <HeroSecondaryButton onClick={handleScrollToServices}>
                  {HOME_HERO.secondaryBtn}
                </HeroSecondaryButton>
              </HeroActions>

              <HeroTrustGrid>
                <TrustItem>
                  <Star size={16} fill="currentColor" />
                  <span>{HOME_HERO.ratingTrust}</span>
                </TrustItem>
                <TrustItem>
                  <ShieldCheck size={16} />
                  <span>{HOME_HERO.emergencyTrust}</span>
                </TrustItem>
                <TrustItem>
                  <Stethoscope size={16} />
                  <span>{HOME_HERO.specialistsTrust}</span>
                </TrustItem>
              </HeroTrustGrid>
            </HeroLeft>

            <HeroRight>
              <HeroImageCard>
                <Image
                  src="/hero-dentistry.png"
                  alt={HOME_HERO.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <HeroFloatingBadge>
                  <FloatingBadgeIcon>
                    <Award size={20} />
                  </FloatingBadgeIcon>
                  <FloatingBadgeText>
                    <FloatingBadgeTitle>{HOME_HERO.floatingBadge}</FloatingBadgeTitle>
                    <FloatingBadgeSubtitle>{HOME_HERO.videoMeta}</FloatingBadgeSubtitle>
                  </FloatingBadgeText>
                </HeroFloatingBadge>
              </HeroImageCard>
            </HeroRight>
          </HeroInner>
        </HeroSection>
      </SectionAnchor>

      {/* 2. CARE PROCESS TIMELINE */}
      <TimelineSection>
        <TimelineInner>
          {careTimelineSteps.map((step) => (
            <TimelineStep key={step.step}>
              <StepNumber>{getStepIcon(step.step)}</StepNumber>
              <StepContent>
                <StepTitle>{step.name}</StepTitle>
                <StepDesc>{step.desc}</StepDesc>
              </StepContent>
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
                  alt={HOME_ABOUT.badge}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </CardHeightOne>
              <CardHeightTwo>
                <Image
                  src="/dental-chair.png"
                  alt={HOME_HERO.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
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

              <LearnMoreButton onClick={() => { window.location.href = '/about'; }}>
                {HOME_SERVICES.learnMore}
                <ArrowRight size={16} />
              </LearnMoreButton>
            </AboutContent>
          </AboutInner>
        </AboutSection>
      </SectionAnchor>

      {/* 4. CLINICAL SERVICES */}
      <SectionAnchor id="services">
        <ServicesSection>
          <ServicesInner>
            <SectionHeaderCentered>
              <SectionBadgeLabel>{HOME_SERVICES.badge}</SectionBadgeLabel>
              <SectionTitleHeader>{HOME_SERVICES.title}</SectionTitleHeader>
              <SectionSubtitleText>{HOME_SERVICES.subtitle}</SectionSubtitleText>
            </SectionHeaderCentered>

            <ServicesCardsGrid>
              {serviceCategories.map((service) => (
                <ServiceCard key={service.id}>
                  <ServiceCardHeader>
                    <ServiceIconCircle>{getServiceIcon(service.id)}</ServiceIconCircle>
                    <ServiceRating>
                      <Star size={12} fill="currentColor" />
                      {service.rating}
                    </ServiceRating>
                  </ServiceCardHeader>
                  <ServiceTitle>{service.name}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceCardAction onClick={handleBooking}>
                    {HOME_SERVICES.bookBtn}
                    <ArrowRight size={14} />
                  </ServiceCardAction>
                </ServiceCard>
              ))}
            </ServicesCardsGrid>
          </ServicesInner>
        </ServicesSection>
      </SectionAnchor>

      {/* 5. CLINICAL SPECIALISTS */}
      <SectionAnchor id="specialists">
        <SpecialistsSection>
          <SpecialistsInner>
            <SectionHeaderCentered>
              <SectionBadgeLabel>{HOME_SPECIALISTS_SECTION.badge}</SectionBadgeLabel>
              <SectionTitleHeader>{HOME_SPECIALISTS_SECTION.title}</SectionTitleHeader>
              <SectionSubtitleText>{HOME_SPECIALISTS_SECTION.subtitle}</SectionSubtitleText>
            </SectionHeaderCentered>

            <SpecialistsGrid>
              {SPECIALISTS_LIST.map((doc) => (
                <SpecialistCard key={doc.name}>
                  <SpecialistImageWrapper>
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </SpecialistImageWrapper>
                  <SpecialistDetails>
                    <DocHeaderGroup>
                      <DocName>{doc.name}</DocName>
                      <DocRole>{doc.title} • {doc.experience}</DocRole>
                    </DocHeaderGroup>

                    <DocRatingPill>
                      <Star size={14} fill="currentColor" />
                      <span>{doc.rating} ({doc.reviews} reviews)</span>
                    </DocRatingPill>

                    <DocSpecialtiesRow>
                      {doc.specialties.map((spec) => (
                        <SpecialtyPill key={spec}>{spec}</SpecialtyPill>
                      ))}
                    </DocSpecialtiesRow>

                    <DocBookBtn onClick={handleBooking}>
                      {HOME_SPECIALISTS_SECTION.bookWithPrefix}{doc.name.split(' ')[1]}
                      <ArrowRight size={14} />
                    </DocBookBtn>
                  </SpecialistDetails>
                </SpecialistCard>
              ))}
            </SpecialistsGrid>

            <ViewAllSpecialistsLink onClick={handleSpecialists}>
              {HOME_SPECIALISTS_SECTION.viewAllBtn}
              <ArrowRight size={16} />
            </ViewAllSpecialistsLink>
          </SpecialistsInner>
        </SpecialistsSection>
      </SectionAnchor>

      {/* 6. WHY PATIENTS TRUST RIK DENTAL */}
      <WhyChooseSection>
        <WhyChooseInner>
          <SectionHeaderCentered>
            <SectionBadgeLabel>{HOME_WHY_CHOOSE.badge}</SectionBadgeLabel>
            <SectionTitleHeader>
              {HOME_WHY_CHOOSE.titleFirst} <span>{HOME_WHY_CHOOSE.titleSpan}</span>
            </SectionTitleHeader>
            <SectionSubtitleText>{HOME_WHY_CHOOSE.subtitle}</SectionSubtitleText>
          </SectionHeaderCentered>

          <WhyChooseGrid>
            {HOME_WHY_CHOOSE.items.map((item, idx) => (
              <FeatureCard key={idx}>
                <FeatureIconBox>{getWhyChooseIcon(idx)}</FeatureIconBox>
                <FeatureTitle>{item.title}</FeatureTitle>
                <FeatureDesc>{item.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </WhyChooseGrid>
        </WhyChooseInner>
      </WhyChooseSection>

      {/* 7. PATIENT TESTIMONIALS */}
      <SectionAnchor id="testimonials">
        <TestimonialSection>
          <SectionHeaderCentered>
            <SectionBadgeLabel>{HOME_TESTIMONIALS.badge}</SectionBadgeLabel>
            <SectionTitleHeader>{HOME_TESTIMONIALS.title}</SectionTitleHeader>
            <SectionSubtitleText>{HOME_TESTIMONIALS.subtitle}</SectionSubtitleText>
          </SectionHeaderCentered>

          <CarouselContainer>
            <StarsRow>
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </StarsRow>

            <CarouselBodyText>
              &ldquo;{currentTestimonial.text}&rdquo;
            </CarouselBodyText>

            <CarouselMeta>
              <AuthorInfo>
                <AuthorName>{currentTestimonial.name}</AuthorName>
                <AuthorRole>{currentTestimonial.role}</AuthorRole>
              </AuthorInfo>

              <CarouselArrows>
                <ArrowBtn onClick={handlePrevTestimonial} aria-label="Previous testimonial">
                  <ChevronLeft size={18} />
                </ArrowBtn>
                <ArrowBtn onClick={handleNextTestimonial} aria-label="Next testimonial">
                  <ChevronRight size={18} />
                </ArrowBtn>
              </CarouselArrows>
            </CarouselMeta>
          </CarouselContainer>
        </TestimonialSection>
      </SectionAnchor>

      {/* 8. CLINIC HOURS & CONTACT INFO */}
      <ClinicInfoSection>
        <ClinicInfoInner>
          {/* Hours Card */}
          <InfoCard>
            <InfoCardTitle>
              <Clock size={20} />
              {HOME_CLINIC_INFO.hoursTitle}
            </InfoCardTitle>
            <HoursTable>
              {OPENING_HOURS.map((item, index) => (
                <HoursRow key={index}>
                  <HoursDay>{item.day}</HoursDay>
                  <HoursTime>{item.time}</HoursTime>
                </HoursRow>
              ))}
            </HoursTable>
            <EmergencyAlertCallout>
              <EmergencyAlertHeader>
                <AlertTriangle size={18} />
                <EmergencyAlertText>{HOME_CLINIC_INFO.emergencyPrompt}</EmergencyAlertText>
              </EmergencyAlertHeader>
              <EmergencyDeskButton onClick={handleEmergency}>
                {HOME_CLINIC_INFO.emergencyBtn}
              </EmergencyDeskButton>
            </EmergencyAlertCallout>
          </InfoCard>

          {/* Contact Card */}
          <InfoCard>
            <InfoCardTitle>
              <MapPin size={20} />
              {HOME_CLINIC_INFO.contactTitle}
            </InfoCardTitle>
            <ContactItem>
              <MapPin size={18} />
              <span>{CONTACT_INFO.address}</span>
            </ContactItem>
            <ContactItem>
              <Phone size={18} />
              <span>{CONTACT_INFO.phone}</span>
            </ContactItem>
            <ContactItem>
              <Mail size={18} />
              <span>{CONTACT_INFO.email}</span>
            </ContactItem>
            <ContactButtonGroup>
              <ContactPrimaryButton onClick={handleBooking}>
                {HOME_HERO.primaryBtn}
              </ContactPrimaryButton>
              <ContactSecondaryButton onClick={handleEmergency}>
                {HOME_CLINIC_INFO.emergencyBtn}
              </ContactSecondaryButton>
            </ContactButtonGroup>
          </InfoCard>
        </ClinicInfoInner>
      </ClinicInfoSection>

      {/* 9. APPOINTMENT CTA BANNER */}
      <SectionAnchor id="contact">
        <InsightsSection>
          <InsightsCard>
            <InsightsContent>
              <InsightsLabel>{HOME_INSIGHTS.badge}</InsightsLabel>
              <InsightsTitle>{HOME_INSIGHTS.title}</InsightsTitle>
              <InsightsSubtitle>{HOME_INSIGHTS.subtitle}</InsightsSubtitle>
            </InsightsContent>
            <InsightsActions>
              <InsightsButton onClick={handleBooking}>
                <Calendar size={18} />
                {HOME_INSIGHTS.btn}
              </InsightsButton>
              <InsightsSecondaryButton onClick={onNavigateToChat}>
                <MessageSquare size={18} />
                {HOME_INSIGHTS.aiBtn}
              </InsightsSecondaryButton>
            </InsightsActions>
          </InsightsCard>
        </InsightsSection>
      </SectionAnchor>
    </HomeWrapper>
  );
};

export default Home;
