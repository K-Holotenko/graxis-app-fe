import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { Drawer } from './index';

vi.mock('src/stores/authStore');

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: vi.fn(),
}));
const mockNavigate = vi.fn();

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
vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

describe('Drawer', () => {
  it('should redirect to add publication on button click if authorized', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: true,
    });

    const { getByTestId } = render(<Drawer open onClose={() => {}} />);
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.ADD_PUBLICATION);
  });

  it('should redirect to login on button click if unauthorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: false,
    });

    const { getByTestId } = render(<Drawer open onClose={() => {}} />);
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
