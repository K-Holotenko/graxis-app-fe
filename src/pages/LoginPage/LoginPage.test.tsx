import { render } from '@testing-library/react';

import { TEXT } from 'config/constants';
import { LOGIN_PAGE_CONSTANTS } from './utils/constants';
import { HelmetProvider } from 'react-helmet-async';
import { LoginPage } from '.';

describe('LoginPage', () => {
  it('renders PageContainer with the correct photo', () => {
    const { getByAltText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const mainPhoto = getByAltText('Auth image');

    expect(mainPhoto).toHaveAttribute('src', LOGIN_PAGE_CONSTANTS.IMAGE_SRC);
  });

  // TODO Please uncomment and finish this test by passing the correct location,
  // "PageContainer" text is shown only when the rout is REGISTRATION

  // it('renders PageContainer with the correct title', () => {
  //   const { getByText } = render(
  //     <HelmetProvider>
  //       <LoginPage />
  //     </HelmetProvider>
  //   );
  //   const pageTitle = getByText(LOGIN_PAGE_CONSTANTS.PAGE_TITLE);

  //   expect(pageTitle).toBeInTheDocument();
  // });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const emailTabTitle = getByText(LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE);

    expect(emailTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const phoneTabTitle = getByText(LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE);

    expect(phoneTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const emailTitle = getByText(TEXT.EMAIL);

    expect(emailTitle).toBeDefined();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const passwordTitle = getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title "OR"', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const orTitle = getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text in submit button', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const submitButtonText = getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text "Forgot password?" in button', () => {
    const { getByText } = render(
      <HelmetProvider>
        <LoginPage />
      </HelmetProvider>
    );
    const forgotPasswordButtonText = getByText(TEXT.SUBMIT);

    expect(forgotPasswordButtonText).toBeInTheDocument();
  });

  // TODO Please uncomment and finish this test by passing the correct location,
  // "No account" text is shown only when the rout is REGISTRATION

  // it('renders PageContainer with the correct text "No account?"', () => {
  //   const { getByText } = render(
  //     <HelmetProvider>
  //       <LoginPage />
  //     </HelmetProvider>
  //   );
  //   const noAccount = getByText(TEXT.NO_ACCOUNT);

  //   expect(noAccount).toBeInTheDocument();
  // });

  // TODO Please uncomment and finish this test by passing the correct location,
  // "Register" button is shown only when the rout is REGISTRATION

  // it('renders PageContainer with the correct text "Register" in button', () => {
  //   const { getByText } = render(
  //     <HelmetProvider>
  //       <LoginPage />
  //     </HelmetProvider>
  //   );
  //   const RegisterButtonText = getByText(TEXT.REGISTER);

  //   expect(RegisterButtonText).toBeInTheDocument();
  // });
});
