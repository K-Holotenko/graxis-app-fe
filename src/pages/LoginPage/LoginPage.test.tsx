import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { ROUTES } from 'src/router/routes';

import { LoginPage } from '.';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    AuthErrorCodes: {
      INVALID_IDP_RESPONSE: 'auth/invalid-idp-response',
      EMAIL_EXISTS: 'auth/email-already-in-use',
      INVALID_CODE: 'auth/invalid-verification-code',
    },
    getAuth: vi.fn(() => ({})),
  };
});

describe('LoginPage', () => {
  it('renders PageContainer with the correct title Login page', async () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toBe('Авторизація');
    });
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const emailTitle = getByText(TEXT.EMAIL);

    expect(emailTitle).toBeDefined();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const passwordTitle = getByText(TEXT.PASSWORD);

    expect(passwordTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title "OR"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const orTitle = getByText(TEXT.OR);

    expect(orTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text in submit button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const submitButtonText = getByText(TEXT.SUBMIT);

    expect(submitButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text "Forgot password?" in button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const forgotPasswordButtonText = getByText(TEXT.SUBMIT);

    expect(forgotPasswordButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text "Register" in button', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[ROUTES.LOGIN]}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );
    const authorizeText = getByText('Авторизуватися');

    expect(authorizeText).toBeInTheDocument();
  });
});
