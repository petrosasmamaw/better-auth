import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

/**
 * @typedef {Object} EmailVerificationProps
 * @property {string} userName - The user's name
 * @property {string} verifyUrl - The verification URL
 */

const EmailVerification = (props) => {
    const { userName, verifyUrl } = props;
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your account setup</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                Verify Your Email Address
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Thank you {userName} for signing up! To complete your account setup and start using our services, 
                please verify your email address by clicking the button below.
              </Text>
              
              <Section className="text-center mb-[32px]">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>
              
              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                This verification link will expire in 24 hours. If you didn't create an account, 
                you can safely ignore this email.
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[32px] leading-[20px]">
                If the button doesn't work, you can copy and paste this link into your browser:
                <br />
                {verifyUrl}
              </Text>
            </Section>
            
            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                © 2026 UNIFIND. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                UNI FIND <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                <a href="#" style={{ color: '#6B7280', textDecoration: 'underline' }}>Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;