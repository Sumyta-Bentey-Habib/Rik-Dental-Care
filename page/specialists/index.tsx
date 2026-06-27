'use client';

import React from 'react';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { colors } from '../../utils/colors';
import {
  SPECIALISTS_HERO,
  SPECIALISTS_LIST,
  SPECIALISTS_TEXT,
} from '../../utils/constants';
import {
  SpecialistsWrapper,
  Hero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  ContentContainer,
  DoctorCard,
  ImageWrapper,
  DocAvatarImg,
  DoctorDetails,
  DocHeader,
  DocName,
  DocRole,
  DocRatingRow,
  DocReviewsCount,
  SpecialtyBadgeRow,
  SpecialtyBadge,
  CredentialsList,
  CredentialItem,
  CredMeta,
  CredTitle,
  CredSub,
  BookButton
} from './style';

interface SpecialistsProps {
  onNavigateToAuth: (mode?: 'login' | 'register') => void;
  onNavigateToDashboard: () => void;
  isLoggedIn: boolean;
}

export const Specialists: React.FC<SpecialistsProps> = ({
  onNavigateToAuth,
  onNavigateToDashboard,
  isLoggedIn
}) => {
  const handleBook = () => {
    if (isLoggedIn) {
      onNavigateToDashboard();
    } else {
      onNavigateToAuth();
    }
  };

  return (
    <SpecialistsWrapper>
      {/* Hero */}
      <Hero>
        <HeroBadge>{SPECIALISTS_HERO.badge}</HeroBadge>
        <HeroTitle>{SPECIALISTS_HERO.titleFirst} <span>{SPECIALISTS_HERO.titleSpan}</span></HeroTitle>
        <HeroSubtitle>
          {SPECIALISTS_HERO.subtitle}
        </HeroSubtitle>
      </Hero>

      <ContentContainer>
        {SPECIALISTS_LIST.map((doc, idx) => (
          <DoctorCard key={doc.name} $reversed={idx % 2 !== 0}>
            <ImageWrapper>
              <DocAvatarImg src={doc.image} alt={doc.name} />
            </ImageWrapper>

            <DoctorDetails>
              <DocHeader>
                <DocName>{doc.name}</DocName>
                <DocRole>{doc.title} • {doc.experience} Experience</DocRole>
              </DocHeader>

              <DocRatingRow>
                <Star size={16} fill="currentColor" />
                <span>{doc.rating}</span>
                <DocReviewsCount>({doc.reviews} reviews)</DocReviewsCount>
              </DocRatingRow>

              <SpecialtyBadgeRow>
                {doc.specialties.map((spec) => (
                  <SpecialtyBadge key={spec}>{spec}</SpecialtyBadge>
                ))}
              </SpecialtyBadgeRow>

              <CredentialsList>
                {doc.credentials.map((cred, j) => (
                  <CredentialItem key={j}>
                    <CheckCircle2 size={18} color={colors.primary.default} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <CredMeta>
                      <CredTitle>{cred.title}</CredTitle>
                      <CredSub>{cred.sub}</CredSub>
                    </CredMeta>
                  </CredentialItem>
                ))}
              </CredentialsList>

              <BookButton onClick={handleBook}>
                {SPECIALISTS_TEXT.bookWithPrefix}{doc.name.split(' ')[1]} <ArrowRight size={16} />
              </BookButton>
            </DoctorDetails>
          </DoctorCard>
        ))}
      </ContentContainer>
    </SpecialistsWrapper>
  );
};

export default Specialists;
