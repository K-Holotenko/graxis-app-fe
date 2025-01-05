import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import { RegistrationPage } from '.';
import { REGISTRATION_PAGE_CONFIG } from './utils/config';

describe('RegistrationPage', () => {
  it('renders PageContainer with the correct title Registration page', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.REGISTRATION]}>
          <Routes>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe(REGISTRATION_PAGE_CONFIG.PAGE_TITLE);
    });
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const emailTabTitle = getByText(
      REGISTRATION_PAGE_CONFIG.FORM.EMAIL_TAB.TITLE
    );

    expect(emailTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const phoneTabTitle = getByText(
      REGISTRATION_PAGE_CONFIG.FORM.PHONE_TAB.TITLE
    );

    expect(phoneTabTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const emailTitle = getByText(TEXT.EMAIL);

    expect(emailTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const passwordTitle = getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct confirmation password title', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const confirmationPasswordTitle = getByText(TEXT.CONFIRMATION_PASSWORD);

    expect(confirmationPasswordTitle).toBeInTheDocument();
  });
  it('renders PageContainer with the correct text in checkbox', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const checkboxText = getByText(TEXT.ALLOW_DATA_PROCESSING);

    expect(checkboxText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text in submit button', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const submitButtonText = getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title "OR"', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const orTitle = getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct "Already have account?" text', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.REGISTRATION]}>
          <Routes>
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    const haveAccountText = getByText(TEXT.ALREADY_HAVE_ACCOUNT);

    expect(haveAccountText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct "Authorize" text', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <RegistrationPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const authorizeText = getByText(TEXT.AUTHORIZE);

    expect(authorizeText).toBeInTheDocument();
  });
});
