import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface SignUpProps {
  switchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ switchToLogin }) => {
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
          <h2>Verification</h2>
          <input
            type="text"
            placeholder="Enter Verification Code"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{' '}
            <button onClick={switchToLogin}>Login</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUp;
