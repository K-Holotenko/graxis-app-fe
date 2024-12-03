import { act } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppHeaderDrawer } from './index';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

vi.mock('src/stores/authStore');

describe('AppHeaderDrawer', () => {
  it('should redirect to add listing on button click if authorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: true,
    });

    const { getByTestId, container } = render(
      <BrowserRouter>
        <AppHeaderDrawer open onClose={() => {}} />
        <Routes>
          <Route
            path={ROUTES.ADD_LISTING}
            element={<div>Add listing page</div>}
          />
        </Routes>
      </BrowserRouter>
    );

    const addListingBtn = getByTestId('add-listing-btn');
    await act(async () => fireEvent.click(addListingBtn));
    expect(container).toHaveTextContent(/Add listing page/);
  });

  it('should redirect to login on button click if unauthorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: false,
    });

    const { getByTestId, container } = render(
      <BrowserRouter>
        <AppHeaderDrawer open onClose={() => {}} />
        <Routes>
          <Route path={ROUTES.LOGIN} element={<div>Login page</div>} />
        </Routes>
      </BrowserRouter>
    );

    const addListingBtn = getByTestId('add-listing-btn');
    await act(async () => fireEvent.click(addListingBtn));
    expect(container).toHaveTextContent(/Login page/);
  });
});
