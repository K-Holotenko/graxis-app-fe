import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App as AntAppContextHolder } from 'antd';

import App from './App';
import { GlobalConfigProvider } from './GlobalConfigProvider';

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalConfigProvider>
      <AntAppContextHolder>
        <App />
      </AntAppContextHolder>
    </GlobalConfigProvider>
  </StrictMode>
);
