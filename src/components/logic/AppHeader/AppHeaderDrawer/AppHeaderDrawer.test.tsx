import { act } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { AppHeaderDrawer } from './index';

vi.mock('src/stores/authStore');

describe('AppHeaderDrawer', () => {
  it('should redirect to add publication on button click if authorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: true,
    });

    const { getByTestId, container } = render(
      <Router>
        <AppHeaderDrawer open onClose={() => {}} />
        <Routes>
          <Route
            path={ROUTES.ADD_PUBLICATION}
            element={<div>Add publication page</div>}
          />
        </Routes>
      </Router>
    );

    const addPublicationBtn = getByTestId('add-publication-btn');

    await act(async () => fireEvent.click(addPublicationBtn));
    expect(container).toHaveTextContent(/Add publication page/);
  });

  it('should redirect to login on button click if unauthorized', async () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthorized: false,
    });

    const { getByTestId, container } = render(
      <Router>
        <AppHeaderDrawer open onClose={() => {}} />
        <Routes>
          <Route path={ROUTES.LOGIN} element={<div>Login page</div>} />
        </Routes>
      </Router>
    );

    const addPublicationBtn = getByTestId('add-publication-btn');

    await act(async () => fireEvent.click(addPublicationBtn));
    expect(container).toHaveTextContent(/Login page/);
  });
});
