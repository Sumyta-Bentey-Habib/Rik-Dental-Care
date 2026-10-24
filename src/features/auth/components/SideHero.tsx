import React from 'react';
import {
  Stethoscope,
  Lock,
  ShieldCheck,
  Award,
  Clock,
} from 'lucide-react';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
import {
  SideHeroPanel,
  BrandHeader,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroTrustRow,
  TrustItem,
  HeroEmergencyCallout,
} from '../style';

export const SideHero: React.FC = () => {
  return (
    <SideHeroPanel>
      <BrandHeader>
        <Stethoscope size={28} />
        <h3>
          {BRAND_NAME.first}
          <span>{BRAND_NAME.second}</span>
        </h3>
      </BrandHeader>

      <HeroContent>
        <HeroBadge>{AUTH_TEXT.sideEyebrow}</HeroBadge>
        <HeroTitle>{AUTH_TEXT.sideHeading}</HeroTitle>
        <HeroSubtitle>{AUTH_TEXT.sideDescription}</HeroSubtitle>

        <HeroTrustRow>
          <TrustItem>
            <ShieldCheck size={18} />
            <span>{AUTH_TEXT.badgeHipaa}</span>
          </TrustItem>
          <TrustItem>
            <Lock size={18} />
            <span>{AUTH_TEXT.badgeEncryption}</span>
          </TrustItem>
          <TrustItem>
            <Award size={18} />
            <span>{AUTH_TEXT.badgeSpecialists}</span>
          </TrustItem>
        </HeroTrustRow>
      </HeroContent>

      <HeroEmergencyCallout>
        <Clock size={18} />
        <span>{AUTH_TEXT.emergencyCallout}</span>
      </HeroEmergencyCallout>
    </SideHeroPanel>
  );
};
