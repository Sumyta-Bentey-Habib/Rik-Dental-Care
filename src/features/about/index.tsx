'use client';

import React from 'react';
import { Trophy, Sparkles, Heart, Clock, Shield, Users, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { colors } from '@/constants/colors';
import {
  ABOUT_HERO,
  ABOUT_STATS,
  ABOUT_STORY,
  ABOUT_VALUES,
  ABOUT_VISIT,
} from '@/constants/constants';
import {
  AboutWrapper,
  AboutHero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  SectionSubtitle,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StorySection,
  StoryImageWrapper,
  StoryContent,
  StoryHeading,
  StoryPara,
  ValuesGrid,
  ValueCard,
  ValueIconWrapper,
  ValueMeta,
  ValueTitle,
  ValueDesc,
  VisitGrid,
  VisitCard,
  VisitIconWrapper,
  VisitTitle,
  VisitValue1,
  VisitValue2
} from './style';

export const About: React.FC = () => {
  // Lucide icons mapped to value indices
  const valueIcons = [
    <Heart size={28} key="heart" />,
    <Shield size={28} key="shield" />,
    <Sparkles size={28} key="sparkles" />,
    <Users size={28} key="users" />,
  ];

  // Lucide icons mapped to visit cards
  const visitIcons = [
    <MapPin size={28} key="pin" />,
    <Phone size={28} key="phone" />,
    <Mail size={28} key="mail" />,
  ];

  // Stat icons mapped to stats
  const statIcons = [
    <Trophy size={32} color={colors.primary.default} style={{ margin: '0 auto' }} key="trophy" />,
    <Sparkles size={32} color={colors.primary.default} style={{ margin: '0 auto' }} key="sparkles-stat" />,
    <Heart size={32} color={colors.primary.default} style={{ margin: '0 auto' }} key="heart-stat" />,
    <Clock size={32} color={colors.primary.default} style={{ margin: '0 auto' }} key="clock-stat" />,
  ];

  return (
    <AboutWrapper>
      {/* Hero */}
      <AboutHero>
        <HeroBadge>{ABOUT_HERO.badge}</HeroBadge>
        <HeroTitle>{ABOUT_HERO.titleFirst} <span>{ABOUT_HERO.titleSpan}</span></HeroTitle>
        <HeroSubtitle>
          {ABOUT_HERO.subtitle}
        </HeroSubtitle>
      </AboutHero>

      {/* Stats */}
      <Section>
        <StatsGrid>
          {ABOUT_STATS.map((stat, idx) => (
            <StatCard key={idx}>
              {statIcons[idx]}
              <StatValue>{stat.num}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Our Story */}
        <StorySection>
          <StoryImageWrapper>
            <Image
              src="/hero-dentistry.png"
              alt="Rik Dental Care Clinic"
              fill
              style={{ objectFit: 'cover' }}
            />
          </StoryImageWrapper>
          <StoryContent>
            <StoryHeading>{ABOUT_STORY.title}</StoryHeading>
            {ABOUT_STORY.paras.map((para, i) => (
              <StoryPara key={i}>
                {para}
              </StoryPara>
            ))}
          </StoryContent>
        </StorySection>

        {/* Core Values */}
        <div style={{ marginBottom: '80px' }}>
          <SectionTitle>{ABOUT_VALUES.title}</SectionTitle>
          <SectionSubtitle>{ABOUT_VALUES.subtitle}</SectionSubtitle>
          <ValuesGrid>
            {ABOUT_VALUES.list.map((value, idx) => (
              <ValueCard key={idx}>
                <ValueIconWrapper>
                  {valueIcons[idx]}
                </ValueIconWrapper>
                <ValueMeta>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDesc>{value.desc}</ValueDesc>
                </ValueMeta>
              </ValueCard>
            ))}
          </ValuesGrid>
        </div>

        {/* Visit Us */}
        <div>
          <SectionTitle>{ABOUT_VISIT.title}</SectionTitle>
          <SectionSubtitle>{ABOUT_VISIT.subtitle}</SectionSubtitle>
          <VisitGrid>
            {ABOUT_VISIT.cards.map((card, idx) => (
              <VisitCard key={idx}>
                <VisitIconWrapper>
                  {visitIcons[idx]}
                </VisitIconWrapper>
                <VisitTitle>{card.title}</VisitTitle>
                <VisitValue1>{card.val1}</VisitValue1>
                <VisitValue2>{card.val2}</VisitValue2>
              </VisitCard>
            ))}
          </VisitGrid>
        </div>
      </Section>
    </AboutWrapper>
  );
};

export default About;
