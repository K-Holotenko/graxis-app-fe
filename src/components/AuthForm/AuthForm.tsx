import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export const AuthForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  const switchToSignUp = (): void => setIsRegistering(true);
  const switchToLogin = (): void => setIsRegistering(false);

  return (
    <div className="auth-form">
      {isRegistering ? (
        <SignUp switchToLogin={switchToLogin} />
      ) : (
        <Login switchToSignUp={switchToSignUp} />
      )}
    </div>
  );
};
