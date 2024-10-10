import React, { useState } from 'react';

interface VerificationFormProps {
  setIsVerifying: (isVerifying: boolean) => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({
  setIsVerifying,
}): JSX.Element => {
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (): Promise<void> => {
    if (verificationCode === '123456') {
      setMessage('Registration successful!');
      setIsVerifying(false);
    } else {
      setMessage('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="verification-form">
      <h2>Verification</h2>
      <input
        type="text"
        placeholder="Enter your verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerify}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerificationForm;
