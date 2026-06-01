'use client';

import React from 'react';
import { Trophy, Sparkles, Heart, Clock, Shield, Users, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
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
  return (
    <AboutWrapper>
      {/* Hero */}
      <AboutHero>
        <HeroBadge>About Us</HeroBadge>
        <HeroTitle>Redefining Dental <span>Excellence</span></HeroTitle>
        <HeroSubtitle>
          Since 2010, Rik Dental Care Center has been setting the standard for boutique, patient-centric dental care.
        </HeroSubtitle>
      </AboutHero>

      {/* Stats */}
      <Section>
        <StatsGrid>
          <StatCard>
            <Trophy size={32} color="#1d4ed8" style={{ margin: '0 auto' }} />
            <StatValue>15+</StatValue>
            <StatLabel>Years of Excellence</StatLabel>
          </StatCard>
          <StatCard>
            <Sparkles size={32} color="#1d4ed8" style={{ margin: '0 auto' }} />
            <StatValue>12,000+</StatValue>
            <StatLabel>Smiles Transformed</StatLabel>
          </StatCard>
          <StatCard>
            <Heart size={32} color="#1d4ed8" style={{ margin: '0 auto' }} />
            <StatValue>98%</StatValue>
            <StatLabel>Patient Satisfaction</StatLabel>
          </StatCard>
          <StatCard>
            <Clock size={32} color="#1d4ed8" style={{ margin: '0 auto' }} />
            <StatValue>24/7</StatValue>
            <StatLabel>Emergency Support</StatLabel>
          </StatCard>
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
            <StoryHeading>Our Story</StoryHeading>
            <StoryPara>
              Founded by Dr. Rik Ahmed after years of advanced training at Harvard School of Dental Medicine, Rik Dental Care was born from a simple belief: dental visits don't have to be stressful.
            </StoryPara>
            <StoryPara>
              We designed every touchpoint—from our calming clinic interiors to our AI-powered booking system—to remove friction and anxiety. Today, we serve over 12,000 patients with a team of specialist dentists.
            </StoryPara>
          </StoryContent>
        </StorySection>

        {/* Core Values */}
        <div style={{ marginBottom: '80px' }}>
          <SectionTitle>Our Core Values</SectionTitle>
          <SectionSubtitle>The principles that guide every interaction, every procedure, every smile.</SectionSubtitle>
          <ValuesGrid>
            <ValueCard>
              <ValueIconWrapper>
                <Heart size={28} />
              </ValueIconWrapper>
              <ValueMeta>
                <ValueTitle>Patient-First Philosophy</ValueTitle>
                <ValueDesc>Every decision we make centers on your comfort, health, and absolute well-being.</ValueDesc>
              </ValueMeta>
            </ValueCard>
            <ValueCard>
              <ValueIconWrapper>
                <Shield size={28} />
              </ValueIconWrapper>
              <ValueMeta>
                <ValueTitle>Clinical Integrity</ValueTitle>
                <ValueDesc>We adhere to the highest international safety standards with evidence-based dental care.</ValueDesc>
              </ValueMeta>
            </ValueCard>
            <ValueCard>
              <ValueIconWrapper>
                <Sparkles size={28} />
              </ValueIconWrapper>
              <ValueMeta>
                <ValueTitle>Aesthetic Precision</ValueTitle>
                <ValueDesc>Great dentistry is invisible. Our cosmetic work blends with your natural facial harmony.</ValueDesc>
              </ValueMeta>
            </ValueCard>
            <ValueCard>
              <ValueIconWrapper>
                <Users size={28} />
              </ValueIconWrapper>
              <ValueMeta>
                <ValueTitle>Collaborative Care</ValueTitle>
                <ValueDesc>Our multidisciplinary team of specialists guarantees all your needs are solved under one roof.</ValueDesc>
              </ValueMeta>
            </ValueCard>
          </ValuesGrid>
        </div>

        {/* Visit Us */}
        <div>
          <SectionTitle>Visit Us</SectionTitle>
          <SectionSubtitle>We are conveniently located in the heart of the city.</SectionSubtitle>
          <VisitGrid>
            <VisitCard>
              <VisitIconWrapper>
                <MapPin size={28} />
              </VisitIconWrapper>
              <VisitTitle>Location</VisitTitle>
              <VisitValue1>42 Medical Plaza, Suite 300</VisitValue1>
              <VisitValue2>Dhaka, Bangladesh</VisitValue2>
            </VisitCard>
            <VisitCard>
              <VisitIconWrapper>
                <Phone size={28} />
              </VisitIconWrapper>
              <VisitTitle>Phone</VisitTitle>
              <VisitValue1>+880 1234-567890</VisitValue1>
              <VisitValue2>24/7 Emergency Line</VisitValue2>
            </VisitCard>
            <VisitCard>
              <VisitIconWrapper>
                <Mail size={28} />
              </VisitIconWrapper>
              <VisitTitle>Email</VisitTitle>
              <VisitValue1>care@rikdental.com</VisitValue1>
              <VisitValue2>We respond within 2 hours</VisitValue2>
            </VisitCard>
          </VisitGrid>
        </div>
      </Section>
    </AboutWrapper>
  );
};

export default About;
