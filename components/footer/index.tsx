'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ROUTES } from '../../utils/routes';
import {
  OPENING_HOURS,
  CONTACT_INFO,
  FOOTER_BRAND,
  FOOTER_DESCRIPTION,
  FOOTER_TITLES,
  FOOTER_QUICK_LINKS,
  FOOTER_COPYRIGHT,
  FOOTER_BOTTOM_LINKS,
  AUTH_PATH_PREFIX,
} from '../../utils/constants';
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

  // Hide footer on all auth pages, dashboard, and full-screen chat page
  if (
    pathname?.startsWith(AUTH_PATH_PREFIX) ||
    pathname === ROUTES.DASHBOARD ||
    pathname === ROUTES.CHAT
  ) {
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
                {FOOTER_BRAND.first}<span>{FOOTER_BRAND.second}</span>
              </LogoText>
            </LogoWrapper>
            <FooterDescription>
              {FOOTER_DESCRIPTION}
            </FooterDescription>
          </FooterColumn>

          {/* Column 2: Quick Links */}
          <FooterColumn>
            <FooterTitle>{FOOTER_TITLES.quickLinks}</FooterTitle>
            <FooterLinkList>
              {FOOTER_QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </FooterLinkList>
          </FooterColumn>

          {/* Column 3: Hours of Operation */}
          <FooterColumn>
            <FooterTitle>{FOOTER_TITLES.openingHours}</FooterTitle>
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
            <FooterTitle>{FOOTER_TITLES.contactUs}</FooterTitle>
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
            &copy; {new Date().getFullYear()} {FOOTER_COPYRIGHT}
          </FooterCopyright>
          <FooterBottomLinks>
            {FOOTER_BOTTOM_LINKS.map((link, index) => (
              <FooterBottomLink key={index} href={link.href}>
                {link.label}
              </FooterBottomLink>
            ))}
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
