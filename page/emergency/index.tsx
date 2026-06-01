'use client';

import React from 'react';
import { PhoneCall, AlertTriangle, ChevronDown } from 'lucide-react';
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

const emergenciesList = [
  {
    q: "Severe Dental Trauma or Knocked-Out Tooth",
    a: "If a tooth is knocked out, keep it moist. Try placing it back in the socket without touching the root, or store it in a cup of milk and contact us immediately. Re-implantation is most successful within 1 hour."
  },
  {
    q: "Lost Crown, Filling, or Broken Braces",
    a: "Apply dental wax or temporary filling material (available at pharmacies) to protect the tooth surface. Avoid chewing on that side and request an emergency slot in your dashboard."
  },
  {
    q: "Extreme Toothache with Swelling",
    a: "A throbbing toothache accompanied by facial swelling or a fever can indicate a serious abscess infection. Rinse with warm salt water, take over-the-counter pain relievers, and do not place aspirin directly on the gum."
  }
];

const faqsList = [
  {
    q: "Do you accept dental insurance for emergency procedures?",
    a: "Yes, we partner with major insurance networks including Apex Dental Premium. Our administration team processes co-pays and filings directly for a hassle-free experience."
  },
  {
    q: "What is your emergency clinical protocol?",
    a: "We allocate dedicated slots every day for urgent walkthroughs, severe trauma, or acute pain. You can call our 24/7 hotline directly or book an emergency query through our AI portal."
  },
  {
    q: "How long does Invisalign treatment usually take?",
    a: "Typical alignment treatment takes between 6 to 18 months. We use digital 3D scans on your first consult to map out your custom treatment path."
  }
];

export const Emergency: React.FC = () => {
  return (
    <EmergencyWrapper>
      {/* Hero */}
      <EmergencyHero>
        <AlarmBadge>24/7 Response Active</AlarmBadge>
        <HeroTitle>Emergency <span>Dental Care</span></HeroTitle>
        <HeroSubtitle>
          Experiencing acute dental pain, trauma, or a broken crown? Contact our dedicated trauma desk immediately.
        </HeroSubtitle>
        <HotlineNumberButton href="tel:+8801234567890">
          <PhoneCall size={18} />
          Call +880 1234-567890
        </HotlineNumberButton>
      </EmergencyHero>

      {/* Content */}
      <ContentContainer>
        {/* Warning Callout */}
        <AlertBox>
          <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <AlertTextMeta>
            <AlertTitle>Critical Safety Information</AlertTitle>
            <AlertDesc>
              If you have experienced severe facial trauma, a fractured jaw, or difficulty breathing or swallowing, please bypass clinical dental checkups and proceed directly to the nearest hospital emergency room.
            </AlertDesc>
          </AlertTextMeta>
        </AlertBox>

        {/* Immediate Care Guides */}
        <GuideSection>
          <SectionHeading>Urgent Care Instructions</SectionHeading>
          {emergenciesList.map((item, idx) => (
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
          <SectionHeading>Common Inquiries</SectionHeading>
          {faqsList.map((item, idx) => (
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
