import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { App as AntAppContextHolder } from 'antd';

import App from './App';
import { GlobalConfigProvider } from './GlobalConfigProvider';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <GlobalConfigProvider>
        <AntAppContextHolder>
          <App />
        </AntAppContextHolder>
      </GlobalConfigProvider>
    </HelmetProvider>
  </StrictMode>
);
