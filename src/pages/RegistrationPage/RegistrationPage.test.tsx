import { render } from '@testing-library/react';
import { RegistrationPage } from '.';
import { REGISTRATION_PAGE_CONSTANTS } from './utils/constants';
import { TEXT } from 'config/constants';
import { HelmetProvider } from 'react-helmet-async';

describe('RegistrationPage', () => {
  it('renders PageContainer with the correct photo', () => {
    const { getByAltText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const mainPhoto = getByAltText('Auth image');

    expect(mainPhoto).toHaveAttribute(
      'src',
      REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC
    );
  });

  // TODO Please uncomment and finish this test by passing the correct location,
  // "Registration" title is shown only when the rout is REGISTRATION

  // it('renders PageContainer with the correct title', () => {
  //   const { getByText } = render(
  //     <HelmetProvider>
  //       <RegistrationPage />
  //     </HelmetProvider>
  //   );
  //   const pageTitle = getByText(REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE);

  //   expect(pageTitle).toBeInTheDocument();
  // });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const emailTabTitle = getByText(
      REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE
    );

    expect(emailTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const phoneTabTitle = getByText(
      REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE
    );

    expect(phoneTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const emailTitle = getByText(TEXT.EMAIL);

    expect(emailTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const passwordTitle = getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct confirmation password title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const confirmationPasswordTitle = getByText(TEXT.CONFIRMATION_PASSWORD);

    expect(confirmationPasswordTitle).toBeInTheDocument();
  });
  it('renders PageContainer with the correct text in checkbox', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const checkboxText = getByText(TEXT.ALLOW_DATA_PROCESSING);

    expect(checkboxText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text in submit button', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const submitButtonText = getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title "OR"', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const orTitle = getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  // TODO Please uncomment and finish this test by passing the correct location,
  // "Already have account?" is shown only when the rout is REGISTRATION

  // it('renders PageContainer with the correct "Already have account?" text', () => {
  //   const { getByText } = render(
  //     <HelmetProvider>
  //       <RegistrationPage />
  //     </HelmetProvider>
  //   );
  //   const haveAccountText = getByText(TEXT.ALREADY_HAVE_ACCOUNT);

  //   expect(haveAccountText).toBeInTheDocument();
  // });

  it('renders PageContainer with the correct "Authorize" text', () => {
    const { getByText } = render(
      <HelmetProvider>
        <RegistrationPage />
      </HelmetProvider>
    );
    const authorizeText = getByText(TEXT.AUTHORIZE);

    expect(authorizeText).toBeInTheDocument();
  });
});
