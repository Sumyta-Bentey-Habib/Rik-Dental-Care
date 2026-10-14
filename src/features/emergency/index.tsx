'use client';

import React from 'react';
import { PhoneCall, AlertTriangle, ChevronDown } from 'lucide-react';
import { colors } from '@/constants/colors';
import {
  EMERGENCY_HERO,
  EMERGENCY_SAFETY,
  EMERGENCY_SECTIONS,
  EMERGENCIES_LIST,
  EMERGENCY_FAQS_LIST,
} from '@/constants/constants';
import {
  EmergencyWrapper,
  EmergencyHero,
  AlarmBadge,
  HeroTitle,
  HeroSubtitle,
  HotlineNumberButton,
  ContentContainer,
  GuideSection,
  SectionHeading,
  AccordionItem,
  SummaryHeader,
  SummaryIcon,
  DetailsBody,
  AlertBox,
  AlertTextMeta,
  AlertTitle,
  AlertDesc
} from './style';

export const Emergency: React.FC = () => {
  return (
    <EmergencyWrapper>
      {/* Hero */}
      <EmergencyHero>
        <AlarmBadge>{EMERGENCY_HERO.badge}</AlarmBadge>
        <HeroTitle>{EMERGENCY_HERO.titleFirst} <span>{EMERGENCY_HERO.titleSpan}</span></HeroTitle>
        <HeroSubtitle>
          {EMERGENCY_HERO.subtitle}
        </HeroSubtitle>
        <HotlineNumberButton href={EMERGENCY_HERO.phoneHref}>
          <PhoneCall size={18} />
          {EMERGENCY_HERO.phoneLabel}
        </HotlineNumberButton>
      </EmergencyHero>

      {/* Content */}
      <ContentContainer>
        {/* Warning Callout */}
        <AlertBox>
          <AlertTriangle size={24} color={colors.status.error} style={{ flexShrink: 0, marginTop: '2px' }} />
          <AlertTextMeta>
            <AlertTitle>{EMERGENCY_SAFETY.title}</AlertTitle>
            <AlertDesc>
              {EMERGENCY_SAFETY.desc}
            </AlertDesc>
          </AlertTextMeta>
        </AlertBox>

        {/* Immediate Care Guides */}
        <GuideSection>
          <SectionHeading>{EMERGENCY_SECTIONS.urgentHeading}</SectionHeading>
          {EMERGENCIES_LIST.map((item, idx) => (
            <AccordionItem key={idx}>
              <SummaryHeader>
                {item.q}
                <SummaryIcon>
                  <ChevronDown size={18} />
                </SummaryIcon>
              </SummaryHeader>
              <DetailsBody>{item.a}</DetailsBody>
            </AccordionItem>
          ))}
        </GuideSection>

        {/* FAQ Section */}
        <GuideSection>
          <SectionHeading>{EMERGENCY_SECTIONS.commonHeading}</SectionHeading>
          {EMERGENCY_FAQS_LIST.map((item, idx) => (
            <AccordionItem key={idx}>
              <SummaryHeader>
                {item.q}
                <SummaryIcon>
                  <ChevronDown size={18} />
                </SummaryIcon>
              </SummaryHeader>
              <DetailsBody>{item.a}</DetailsBody>
            </AccordionItem>
          ))}
        </GuideSection>
      </ContentContainer>
    </EmergencyWrapper>
  );
};

export default Emergency;
