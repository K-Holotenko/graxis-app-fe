import React, { useEffect } from 'react';

import SocialMediaLogin from './components/logic/Auth/SocialMediaAuth';
import { firebaseApp } from './config/firebase';

const App: React.FC = () => {
  useEffect(() => {
    console.log('Firebase Init', firebaseApp);
  }, []);

  return (
    <div className="App">
      <h1>Test page</h1>
      <hr />
      <h2>Graxis</h2>
      <SocialMediaLogin />
    </div>
  );
};

export default App;
