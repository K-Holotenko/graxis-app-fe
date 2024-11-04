import { render, waitFor } from '@testing-library/react';

import { TEXT } from 'config/constants';
import { LOGIN_PAGE_CONSTANTS } from './utils/constants';
import { HelmetProvider } from 'react-helmet-async';
import { LoginPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NoAccountLink } from 'components/ui/NoAccountLink';
import { ROUTES } from 'router/routes';

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

  it('renders PageContainer with the correct title Login page', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe(LOGIN_PAGE_CONSTANTS.PAGE_TITLE);
    });
  });

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

  it('renders PageContainer with the correct text "No account?"', async () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<NoAccountLink />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    const noAccount = getByText(TEXT.NO_ACCOUNT);

    expect(noAccount).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text "Register" in button', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
    const authorizeText = getByText(TEXT.AUTHORIZE);

    expect(authorizeText).toBeInTheDocument();
  });
});
