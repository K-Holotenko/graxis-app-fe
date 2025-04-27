import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { App as AntAppContextHolder } from 'antd';

import { router } from './router';
import { GlobalConfigProvider } from './GlobalConfigProvider';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <AntAppContextHolder>
        <RouterProvider router={router} />
      </AntAppContextHolder>
    </GlobalConfigProvider>
  </StrictMode>
);
