import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { firebaseApp } from './index';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
}));

describe('Firebase Initialization', () => {
  it('should initialize Firebase app with the correct config', () => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
    };

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });

  it('should initialize Firebase Analytics', () => {
    expect(getAnalytics).toHaveBeenCalledWith(firebaseApp);
  });
});
