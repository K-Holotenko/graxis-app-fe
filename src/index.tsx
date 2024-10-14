import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
