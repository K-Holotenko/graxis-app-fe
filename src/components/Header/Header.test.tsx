import { render } from '@testing-library/react';
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

vi.mocked(useNavigate).mockImplementation(() => mockNavigate);

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

  it('should redirect to login on button click if unauthorized', () => {
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
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
