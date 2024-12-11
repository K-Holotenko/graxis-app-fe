import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { AppHeaderDrawer } from './index';

vi.mock('src/stores/authStore');

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: vi.fn(),
}));
const mockNavigate = vi.fn();

vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

describe('AppHeaderDrawer', () => {
  it('should redirect to add publication on button click if authorized', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: true,
    });

    const { getByTestId } = render(<AppHeaderDrawer open onClose={() => {}} />);
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LISTING_PAGE);
  });

  it('should redirect to login on button click if unauthorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: false,
    });

    const { getByTestId } = render(<AppHeaderDrawer open onClose={() => {}} />);
    const addPublicationBtn = getByTestId('add-publication-btn');

    addPublicationBtn.click();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
