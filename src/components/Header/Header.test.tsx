import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { AppHeader } from './index';

vi.mock('src/stores/authStore');

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: vi.fn(),
}));
const mockNavigate = vi.fn();

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

vi.mock('src/hooks/useNotification', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    useNotification: () => ({
      openNotification: vi.fn(),
    }),
  };
});

vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

vi.mock('src/stores/userStore', () => ({
  useUserStore: vi.fn(() => ({
    user: { id: '123', name: 'Test User' },
  })),
}));

describe('AppHeader', () => {
  it('should redirect to add publication on button click if authorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: true,
    });

    const { getByTestId } = render(
      <BrowserRouter>
        <AppHeader />
      </BrowserRouter>
    );
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ADD_PUBLICATION);
  });

  it('should redirect to login on button click if unauthorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: false,
    });

    const { getByTestId } = render(
      <BrowserRouter>
        <AppHeader />
      </BrowserRouter>
    );
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
      },
      { timeout: 6000 }
    );
  }, 6000);
});
