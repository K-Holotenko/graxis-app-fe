import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface SignUpProps {
  switchToLogin: () => void;
}

const signUpText = {
  verification: 'Верифікація',
  inputPlaceholder: 'Введіть верифікаціонний код',
  password: 'Пароль',
  register: 'Зареєструватися',
  haveAccount: 'Маєш аккаунт?',
};

const SignUp = ({ switchToLogin }: SignUpProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerification, setIsVerification] = useState(false);
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await register(email, password);
      setIsVerification(true);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleVerify = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Verification code entered:', verificationCode);
    console.log('Registration successful');
  };

  return (
    <div>
      {isVerification ? (
        <form onSubmit={handleVerify}>
          <h2>{signUpText.verification}</h2>
          <input
            type="text"
            placeholder={signUpText.inputPlaceholder}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={signUpText.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{signUpText.register}</button>
          <p>
            {signUpText.haveAccount}
            <button onClick={switchToLogin}>Login</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUp;
