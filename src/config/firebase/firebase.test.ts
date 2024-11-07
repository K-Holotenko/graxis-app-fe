import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });

  it('should initialize Firebase Analytics', () => {
    expect(getAnalytics).toHaveBeenCalledWith(firebaseApp);
  });
});
