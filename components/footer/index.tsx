'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import { OPENING_HOURS, CONTACT_INFO } from '../../utils/constants';
import {
  ContactIconWrapper,
  FooterBottom,
  FooterBottomLink,
  FooterBottomLinks,
  FooterColumn,
  FooterContactInfo,
  FooterContactItem,
  FooterContainer,
  FooterCopyright,
  FooterDescription,
  FooterGrid,
  FooterLink,
  FooterLinkList,
  HoursDay,
  HoursGrid,
  HoursRow,
  HoursTime,
  FooterTitle,
  FooterWrapper,
  LogoText,
  LogoWrapper,
  StyledLogoIcon
} from './style';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on all auth pages and full-screen chat page
  if (pathname?.startsWith('/auth') || pathname === ROUTES.CHAT) {
    return null;
  }

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterGrid>
          {/* Column 1: Logo & Brief Description */}
          <FooterColumn>
            <LogoWrapper href={ROUTES.HOME}>
              <StyledLogoIcon />
              <LogoText>
                Rik<span>Dental</span>
              </LogoText>
            </LogoWrapper>
            <FooterDescription>
              State-of-the-art dental care center offering expert clinical services and innovative AI-assisted consultation diagnostics for your oral health needs.
            </FooterDescription>
          </FooterColumn>

          {/* Column 2: Quick Links */}
          <FooterColumn>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinkList>
              <li>
                <FooterLink href={ROUTES.HOME}>
                  Home
                </FooterLink>
              </li>
              <li>
                <FooterLink href={ROUTES.SPECIALISTS}>
                  Specialists
                </FooterLink>
              </li>
              <li>
                <FooterLink href={ROUTES.ABOUT}>
                  About Us
                </FooterLink>
              </li>
              <li>
                <FooterLink href={ROUTES.EMERGENCY}>
                  Emergency Care
                </FooterLink>
              </li>
            </FooterLinkList>
          </FooterColumn>

          {/* Column 3: Hours of Operation */}
          <FooterColumn>
            <FooterTitle>Opening Hours</FooterTitle>
            <HoursGrid>
              {OPENING_HOURS.map((item, index) => (
                <HoursRow key={index}>
                  <HoursDay>{item.day}</HoursDay>
                  <HoursTime>{item.time}</HoursTime>
                </HoursRow>
              ))}
            </HoursGrid>
          </FooterColumn>

          {/* Column 4: Contact Information */}
          <FooterColumn>
            <FooterTitle>Contact Us</FooterTitle>
            <FooterContactInfo>
              <FooterContactItem>
                <ContactIconWrapper>
                  <MapPin size={18} />
                </ContactIconWrapper>
                <span>{CONTACT_INFO.address}</span>
              </FooterContactItem>
              <FooterContactItem>
                <ContactIconWrapper>
                  <Phone size={18} />
                </ContactIconWrapper>
                <span>{CONTACT_INFO.phone}</span>
              </FooterContactItem>
              <FooterContactItem>
                <ContactIconWrapper>
                  <Mail size={18} />
                </ContactIconWrapper>
                <span>{CONTACT_INFO.email}</span>
              </FooterContactItem>
            </FooterContactInfo>
          </FooterColumn>
        </FooterGrid>

        {/* Footer Bottom */}
        <FooterBottom>
          <FooterCopyright>
            &copy; {new Date().getFullYear()} Rik Dental Care Center. All rights reserved.
          </FooterCopyright>
          <FooterBottomLinks>
            <FooterBottomLink href="/privacy">Privacy Policy</FooterBottomLink>
            <FooterBottomLink href="/terms">Terms of Service</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
