'use client';

import React from 'react';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { colors } from '../../utils/colors';
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

interface Specialist {
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
  credentials: { title: string; sub: string }[];
}

const specialistsList: Specialist[] = [
  {
    name: "Dr. Rik Ahmed",
    title: "Founder & Lead Implantologist",
    experience: "15+ years",
    rating: 4.9,
    reviews: 248,
    image: "/doctor-carter.png", // reuse doctor-carter image which generated beautifully
    specialties: ["Dental Implants", "Cosmetic Reconstruction", "Regenerative Dentistry"],
    credentials: [
      { title: "Ph.D. in Implantology", sub: "Harvard School of Dental Medicine" },
      { title: "Member of ADA & AACD", sub: "Active contributor to global dental standards" },
      { title: "National Excellence Award 2023", sub: "Recognized for outstanding cosmetic work" }
    ]
  },
  {
    name: "Dr. Sarah Chen",
    title: "Orthodontist & Invisalign Specialist",
    experience: "10+ years",
    rating: 4.8,
    reviews: 195,
    image: "/hero-dentistry.png", // reuse hero dentistry close-up image
    specialties: ["Invisalign", "Braces", "Bite Correction"],
    credentials: [
      { title: "D.D.S. in Orthodontics", sub: "Columbia University" },
      { title: "Invisalign Diamond Provider", sub: "Top 1% of Invisalign providers globally" },
      { title: "Published Researcher", sub: "15+ papers in orthodontic biomechanics" }
    ]
  },
  {
    name: "Dr. Marcus Thorne",
    title: "Periodontist & Gum Specialist",
    experience: "12+ years",
    rating: 4.9,
    reviews: 163,
    image: "/dental-chair.png", // reuse dental chair clean office backdrop image
    specialties: ["Gum Surgery", "Laser Treatment", "Periodontal Care"],
    credentials: [
      { title: "M.D. in Periodontology", sub: "University of Pennsylvania" },
      { title: "Fellow, AAP", sub: "American Academy of Periodontology" },
      { title: "Laser Dentistry Certified", sub: "Advanced training in LANAP procedures" }
    ]
  }
];

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
      <Hero>
        <HeroBadge>Our Clinical Team</HeroBadge>
        <HeroTitle>World-Class <span>Specialists</span></HeroTitle>
        <HeroSubtitle>
          Each member of our team brings decades of specialized training and a commitment to painless, precision dentistry.
        </HeroSubtitle>
      </Hero>

      <ContentContainer>
        {specialistsList.map((doc, idx) => (
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
                Book with {doc.name.split(' ')[1]} <ArrowRight size={16} />
              </BookButton>
            </DoctorDetails>
          </DoctorCard>
        ))}
      </ContentContainer>
    </SpecialistsWrapper>
  );
};

export default Specialists;
