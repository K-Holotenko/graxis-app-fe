import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';

import { RegistrationPage } from '.';

vi.mock('firebase/app', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    getApps: vi.fn(() => []),
  };
});

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

describe('RegistrationPage', () => {
  it('renders PageContainer with the correct title Registration page', async () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.REGISTRATION]}>
        <Routes>
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toBe('Реєстрація');
    });
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const emailTitle = getByText('Email');

    expect(emailTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const passwordTitle = getByText('Пароль');

    expect(passwordTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct confirmation password title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const confirmationPasswordTitle = getByText('Повторіть пароль');

    expect(confirmationPasswordTitle).toBeInTheDocument();
  });
  it('renders PageContainer with the correct text in checkbox', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const checkboxText = getByText(
      'Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача'
    );

    expect(checkboxText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct text in submit button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const submitButtonText = getByText('Продовжити');

    expect(submitButtonText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct title "OR"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const orTitle = getByText('Або');

    expect(orTitle).toBeInTheDocument();
  });

  it('renders PageContainer with the correct "Already have account?" text', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[ROUTES.REGISTRATION]}>
        <Routes>
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        </Routes>
      </MemoryRouter>
    );

    const haveAccountText = getByText('У вас є акаунт?');

    expect(haveAccountText).toBeInTheDocument();
  });

  it('renders PageContainer with the correct "Authorize" text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    const authorizeText = getByText('Авторизуватися');

    expect(authorizeText).toBeInTheDocument();
  });
});
