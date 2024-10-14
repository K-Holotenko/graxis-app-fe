import React, { useEffect } from 'react';
import { AuthForm } from './components/AuthForm/AuthForm';
import AuthProvider from './components/AuthForm/AuthContext';
import { firebaseApp } from './config/firebase';

const App: React.FC = () => {
  useEffect(() => {
    console.log('Firebase Init', firebaseApp);
  }, []);

  return (
    <AuthProvider>
      <div className="app">
        <h1>Authentication App</h1>
        <AuthForm />
      </div>
    </AuthProvider>
  );
};

export default App;
